import React, { memo, useCallback } from 'react';
import { Block, Icon, Text } from './CoreComponents';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootNavigation } from 'containers/Router/Router.type';

interface Props {
  title?: string;
  description?: string;
  back?: boolean;
  onPressBack?: () => void;
}

const HeaderV2 = ({ title, description, back, onPressBack }: Props) => {
  const navigation = useNavigation<RootNavigation>();

  const onPressBackLocal = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Block fill alignItems="flex-start">
      {back && (
        <Icon
          name="o:arrow_left"
          size={24}
          onPress={onPressBack || onPressBackLocal}
          marginBottom={6}
        />
      )}
      <Text style={styles.title} variant="headline" fontWeight="600">
        {title}
      </Text>
      <Text marginTop={10}>{description}</Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    lineHeight: 30,
  },
  container: { zIndex: 1 },
});

export default memo(HeaderV2);
