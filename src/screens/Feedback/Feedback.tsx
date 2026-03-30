import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Block,
  Button,
  Icon,
  Text,
  TextInput,
} from 'components/CoreComponents';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import useTranslation from 'helpers/hooks/useTranslation';
import useToastHook from 'helpers/hooks/useToastHook';
import { APIEndpointHelper } from 'helpers/api/ApiEndpointHelper';
import { FeedbackCategory } from 'types/models';
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootNavigation, RootStackParamList } from 'containers/Router/Router.type';
import { Header } from 'components/Header/Header';
import AnalyticHelper from 'containers/analytic/AnalyticHelper';

const voteValues = [1, 2, 3, 4, 5];

export default function Feedback() {
  const insets = useSafeAreaInsets();
  const { i18n } = useTranslation();
  const { showToast } = useToastHook();
  const navigation = useNavigation<RootNavigation>();
  const route = useRoute<RouteProp<RootStackParamList, 'FEEDBACK'>>();
  const exerciseId = route.params?.exercise_id ?? route.params?.exercise?.exercise?.id;
  const hasExerciseSource = !!route.params?.exercise;

  const [vote, setVote] = useState<number | null>(null);
  const [category, setCategory] = useState<FeedbackCategory>('general');
  const [feedbackText, setFeedbackText] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = useMemo(
    () => [
      {
        key: 'suggestion' as const,
        label: i18n.t('feedback.categories.suggestion'),
      },
      {
        key: 'error' as const,
        label: i18n.t('feedback.categories.error'),
      },
      {
        key: 'general' as const,
        label: i18n.t('feedback.categories.general'),
      },
    ],
    [i18n],
  );

  const goHomeWithReset = () => {
    const action = CommonActions.reset({
      index: 0,
      routes: [{ name: 'HOME' }],
    });
    navigation.dispatch(action);
  };

  const onPressSubmit = async () => {
    const trimmedFeedback = feedbackText.trim();

    if (!vote) {
      return;
    }

    try {
      setLoading(true);
      const result = await APIEndpointHelper.createFeedback({
        feedback: trimmedFeedback,
        vote,
        category,
        exercise_id: exerciseId,
      });

      if (!result) {
        showToast(i18n.t('feedback.submit_error'), 'error');
        return;
      }

      AnalyticHelper.logEvent('feedback_submitted', {
        vote,
        feedback: trimmedFeedback,
        exercise_id: exerciseId ?? null,
      });
      showToast(i18n.t('feedback.submit_success'), 'success');
      if (hasExerciseSource) {
        goHomeWithReset();
      } else {
        navigation.goBack();
      }
    } catch (error) {
      showToast(i18n.t('feedback.submit_error'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer bgColor="bg-2">
      <Header
        back
        onPressBack={hasExerciseSource ? goHomeWithReset : undefined}
      />
      <Block
        fill
        flex={1}
        paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
        paddingBottom={insets.bottom + 12}
      >
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={24}
          enableOnAndroid
          style={styles.scrollView}
        >
          <Text
            variant="display"
            size="xs"
            fontWeight="600"
            marginBottom={8}
            fill
            left
          >
            {i18n.t('feedback.vote_label')}
          </Text>
          <Text marginTop={8} marginBottom={16} size="sm" color="neutral.700">
            {i18n.t('feedback.description')}
          </Text>
          <Text
            marginTop={8}
            marginBottom={16}
            size="md"
            fontWeight="600"
            fill
            center
          >
            {i18n.t('feedback.vote')}
          </Text>
          <Block fill gap={10} flexDirection="row">
            {voteValues.map(value => (
              <TouchableOpacity
                key={value}
                style={styles.voteItem}
                activeOpacity={0.8}
                onPress={() => setVote(value)}
              >
                <Icon
                  name={vote && value <= vote ? 's:heart' : 'o:heart'}
                  color={vote && value <= vote ? 'primary.500' : 'neutral.400'}
                  size={40}
                />
              </TouchableOpacity>
            ))}
          </Block>

          <Text
            variant="subhead"
            size="sm"
            fontWeight="600"
            marginTop={16}
            marginBottom={8}
          >
            {i18n.t('feedback.category_label')}
          </Text>
          <View style={styles.categoryRow}>
            {categories.map(item => {
              const selected = item.key === category;
              return (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.categoryItem,
                    selected && styles.categoryItemSelected,
                  ]}
                  onPress={() => setCategory(item.key)}
                  activeOpacity={0.8}
                >
                  <Text
                    size="xs"
                    color={selected ? 'custom-wb' : 'neutral.700'}
                    fontWeight={selected ? '600' : '400'}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text
            variant="subhead"
            size="sm"
            fontWeight="600"
            marginTop={16}
            marginBottom={8}
          >
            {i18n.t('feedback.feedback_label')}
          </Text>
          <TextInput
            fill
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            maxLength={400}
            value={feedbackText}
            onChangeText={setFeedbackText}
            placeholder={i18n.t('feedback.placeholder')}
          />
        </KeyboardAwareScrollView>

        <Button
          fill
          text={i18n.t('feedback.submit')}
          onPress={onPressSubmit}
          loading={loading}
          disabled={loading || !vote}
        />
      </Block>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteItem: {
    marginRight: 10,
    paddingVertical: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryItem: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryItemSelected: {
    borderColor: '#146A45',
    backgroundColor: '#146A45',
  },
});
