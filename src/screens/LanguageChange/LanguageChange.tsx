import {Block} from 'components/CoreComponents';
import {Header} from 'components/Header/Header';
import ListItem from 'components/ListItem/ListItem';

import {
  DEFAULT_DIVIDER_HEIGHT,
  DEFAULT_SCREEN_HORIZONTAL_PADDING,
} from 'constants/design';
import {LanguageList} from 'constants/i18n';
import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import useTranslation from 'helpers/hooks/useTranslation';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {LanguageType} from 'types/setting';

export default function LanguageChange() {
  const {i18n, language, updateLanguage} = useTranslation();
  const [localLanguage, setLocalLanguage] = useState(language);

  const onChangeLanguage = (lang: LanguageType) => {
    setLocalLanguage(lang);
    setTimeout(() => {
      updateLanguage(lang);
    }, 0);
  };

  useEffect(() => {
    setLocalLanguage(language);
  }, [language]);

  const langs = LanguageList.map(item => ({
    key: item.languageType,
    title: i18n.t(item.i18nKey),
  })).sort((a, b) => a.title.localeCompare(b.title));

  return (
    <ScreenContainer>
      <Header title={i18n.t('language.title')} back />
      <Block
        fill
        flex={1}
        marginTop={DEFAULT_DIVIDER_HEIGHT}
        // marginHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          {langs.map(lang => {
            return (
              <ListItem
                title={lang.title}
                rightIcon={localLanguage === lang.key ? 'o:check' : undefined}
                rightIconColor={'primary.500'}
                showLayoutBackground={localLanguage === lang.key}
                onPress={() => onChangeLanguage(lang.key)}
              />
            );
          })}
        </ScrollView>
      </Block>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  content: {
    paddingHorizontal: DEFAULT_SCREEN_HORIZONTAL_PADDING,
  },
});
