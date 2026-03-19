import { Block, Icon, Text } from 'components/CoreComponents';
import ListItem from 'components/CoreComponents/ListItem';
import useAuthHook from 'helpers/hooks/useAuthHook';
import useTranslation from 'helpers/hooks/useTranslation';
import { useMenu } from './useMenu';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

// import { useTheme } from 'helpers/hooks/useThemeColor';
import { ModalBottomSheet } from 'components/BottomSheet/ModalBottomSheet';
import { BottomSheetView } from 'components/BottomSheet';
import { useNavigation } from '@react-navigation/native';
import { RootNavigation } from 'containers/Router/Router.type';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

interface HeaderSectionProps {
  isLoggedIn: boolean;
  userName?: string | null;
  userEmail?: string | null;
  onPressLogin: () => void;
  onPressRegister: () => void;
}

const HeaderSection = ({
  isLoggedIn,
  userName,
  userEmail,
  onPressLogin,
  onPressRegister,
}: HeaderSectionProps) => {
  const { i18n } = useTranslation();

  if (!isLoggedIn) {
    return (
      <View style={styles.section}>
        <Text
          variant="caption1"
          size="xs"
          color="neutral.500"
          style={styles.sectionLabel}
        >
          {i18n.t('home.settings.account')}
        </Text>
        <ListItem
          leftIcon={{ name: 'o:arrow_right' }}
          text={i18n.t('home.settings.login')}
          onPress={onPressLogin}
        />
        <ListItem
          leftIcon={{ name: "o:user" }}
          text={i18n.t('home.settings.register')}
          onPress={onPressRegister}
        />
      </View>
    );
  }

  return (
    <>
      <Block
        marginBottom={16}
        padding={16}
        borderRadius={16}
        backgroundColour="primary.500"
        flexDirection="row"
        alignItems="center"
      >
        <Block
          width={48}
          height={48}
          borderRadius={24}
          backgroundColour="primary.500/20"
          justifyContent="center"
          alignItems="center"
          marginRight={12}
        >
          <Icon name="o:user" size={28} color="custom-wb" />
        </Block>
        <Block flex={1}>
          <Text
            variant="text"
            size="md"
            fontWeight="600"
            color="custom-wb"
            numberOfLines={1}
          >
            {userName || userEmail || '-'}
          </Text>
          {!!userEmail && (
            <Text
              variant="caption1"
              size="xs"
              color="custom-wb"
              style={styles.email}
              numberOfLines={1}
            >
              {userEmail}
            </Text>
          )}
        </Block>
      </Block>

      <View style={styles.section}>
        <Text
          variant="caption1"
          size="xs"
          color="neutral.500"
          style={styles.sectionLabel}
        >
          {i18n.t('home.settings.profile')}
        </Text>
        <ListItem
          leftIcon={{ name: 'o:setting-2' }}
          text={i18n.t('home.settings.update_preferences')}
          onPress={onPressRegister}
        />
      </View>
    </>
  );
};

export function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const { i18n } = useTranslation();
  const navigation = useNavigation<RootNavigation>();
  const { user, isLoggedIn, logout } = useAuthHook();
  const {
    onPressLanguage,
    onPressPrivacyPolicy,
    onPressTermsOfUse,
    onPressContact,
    onPressFeedback,
  } = useMenu({ onClose });
  // const { theme } = useTheme();

  const currentLanguageLabel = useMemo(() => {
    // i18n.locale zaten 'tr', 'en' gibi; LanguageChange ekranıyla uyumlu olacak şekilde basit gösterim.
    switch (i18n.locale) {
      case 'tr':
        return 'Türkçe';
      case 'en':
        return 'English';
      default:
        return i18n.locale?.toUpperCase?.() ?? '';
    }
  }, [i18n.locale]);

  // const themeLabelKey = useMemo(() => {
  //   if (theme === 'dark') return 'dark';
  //   if (theme === 'light') return 'light';
  //   return 'system';
  // }, [theme]);

  const handleLogout = () => {
    if (!isLoggedIn) return;
    logout();
    onClose();
  };

  const onPressLogin = () => {
    navigation.navigate('LOGIN');
    // TODO: Login ekranına yönlendirme (şu an için sadece modalı kapat).
    onClose();
  };

  const onPressRegister = () => {
    // TODO: Register ekranına yönlendirme.
    onClose();
  };

  return (
    <ModalBottomSheet isVisible={visible} onClose={onClose}>
      <BottomSheetView style={styles.sheet}>
        <HeaderSection
          isLoggedIn={isLoggedIn}
          userName={user?.name}
          userEmail={user?.email}
          onPressLogin={onPressLogin}
          onPressRegister={onPressRegister}
        />

        <View style={styles.section}>
          <Text
            variant="caption1"
            size="xs"
            color="neutral.500"
            style={styles.sectionLabel}
          >
            {i18n.t('home.settings.preferences')}
          </Text>
          <ListItem
            leftIcon={{ name: 'o:language' }}
            text={i18n.t('home.settings.app_language')}
            onPress={onPressLanguage}
            renderRight={() => (
              <Text variant="caption1" size="xs" color="neutral.600">
                {currentLanguageLabel}
              </Text>
            )}
          />
          {/* <ListItem
            leftIcon={{ name: 'o:moon' }}
            text={i18n.t('home.settings.app_appearance')}
            renderRight={() => (
              <Block flexDirection="row" alignItems="center" gap={8}>
                <Text variant="caption1" size="xs" color="neutral.600">
                  {i18n.t(`home.settings.theme_${themeLabelKey}`)}
                </Text>
                <Switch value={false} />
              </Block>
            )}
          /> */}
        </View>

        <View style={styles.section}>
          <Text
            variant="caption1"
            size="xs"
            color="neutral.500"
            style={styles.sectionLabel}
          >
            {i18n.t('home.settings.support')}
          </Text>
          <ListItem
            leftIcon={{ name: 'o:comment' }}
            text={i18n.t('home.settings.feedback')}
            onPress={onPressFeedback}
          />
          <ListItem
            leftIcon={{ name: 'o:sms' }}
            text={i18n.t('home.settings.contact_us')}
            onPress={onPressContact}
          />
        </View>

        <View style={styles.section}>
          <Text
            variant="caption1"
            size="xs"
            color="neutral.500"
            style={styles.sectionLabel}
          >
            {i18n.t('home.settings.legal')}
          </Text>
          <ListItem
            leftIcon={{ name: 'o:document_text' }}
            text={i18n.t('home.settings.privacy_policy')}
            onPress={onPressPrivacyPolicy}
          />
          <ListItem
            leftIcon={{ name: 'o:document_text' }}
            text={i18n.t('home.settings.terms_of_use')}
            onPress={onPressTermsOfUse}
          />
        </View>

        {isLoggedIn && (
          <Block marginTop={16}>
            <ListItem
              leftIcon={{ name: 'o:logout', color: 'secondary.600' }}
              text={i18n.t('home.settings.logout')}
              textColor="secondary.600"
              onPress={handleLogout}
            />
          </Block>
        )}
      </BottomSheetView>
    </ModalBottomSheet>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#0000004D',
    justifyContent: 'flex-end',
  },
  sheet: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    marginBottom: 6,
    letterSpacing: 0.6,
  },
  email: {
    marginTop: 2,
  },
});
