import React from 'react';
import { Linking } from 'react-native';
import { Block, Icon, Text } from 'components/CoreComponents';
import { Header } from 'components/Header/Header';
import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import useTranslation from 'helpers/hooks/useTranslation';
import { useNavigation } from '@react-navigation/native';
import { RootNavigation } from 'containers/Router/Router.type';

const INSTAGRAM_URL = 'https://instagram.com/healthbreakapp';

const ContactCard = ({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: 'o:sms' | 's:instagram' | 'o:comment';
  title: string;
  subtitle: string;
  onPress: () => void;
}) => {
  return (
    <Block
      fill
      onPress={onPress}
      borderRadius={14}
      backgroundColour="primary.500/05"
      paddingHorizontal={14}
      paddingVertical={14}
      marginBottom={10}
      flexDirection="row"
      alignItems="center"
    >
      <Block
        width={44}
        height={44}
        borderRadius={22}
        backgroundColour="custom-wb"
        justifyContent="center"
        alignItems="center"
        marginRight={16}
      >
        <Icon name={icon} size={24} color="primary.500" />
      </Block>

      <Block flex={1}>
        <Text size="xs" color="primary.500">
          {title}
        </Text>
        <Text variant="text" size="sm" fontWeight="500" color="primary.500">
          {subtitle}
        </Text>
      </Block>

      <Icon name="o:chevron_right" size={18} color="neutral.500" />
    </Block>
  );
};

export default function Contact() {
  const { i18n } = useTranslation();
  const navigation = useNavigation<RootNavigation>();

  const onPressEmail = () => {
    Linking.openURL('mailto:info@venei.co');
  };

  const onPressInstagram = () => {
    Linking.openURL(INSTAGRAM_URL);
  };

  const onPressDirectMessage = () => {
    navigation.navigate('FEEDBACK');
  };

  return (
    <ScreenContainer bgColor="bg-2">
      <Header title={i18n.t('contact.title')} back />
      <Block
        fill
        flex={1}
        justifyContent="flex-start"
        paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
        paddingTop={8}
      >
        <Text marginBottom={18} size="sm" color="neutral.700">
          {i18n.t('contact.description')}
        </Text>

        <ContactCard
          icon="o:sms"
          title={i18n.t('contact.email_title')}
          subtitle={i18n.t('contact.email_subtitle')}
          onPress={onPressEmail}
        />

        <ContactCard
          icon="s:instagram"
          title={i18n.t('contact.instagram_title')}
          subtitle={i18n.t('contact.instagram_subtitle')}
          onPress={onPressInstagram}
        />

        <ContactCard
          icon="o:comment"
          title={i18n.t('contact.direct_message_title')}
          subtitle={i18n.t('contact.direct_message_subtitle')}
          onPress={onPressDirectMessage}
        />
      </Block>
    </ScreenContainer>
  );
}
