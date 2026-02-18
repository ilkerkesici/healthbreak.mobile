import React from 'react';
import { Modal } from 'react-native';
import { Block, Button, Text } from 'components/CoreComponents';
import Display from 'components/CoreComponents/Display';
import useGeneralPopUpHook from './useGeneralPopUpHook';
import Image from 'components/CoreComponents/Image/Image';

export default function GeneralPopUp() {
  const { extraStyle, opened, title, subtitle, buttons, image, onPressButton } =
    useGeneralPopUpHook();

  return (
    <Modal
      visible={!!opened}
      transparent
      style={{ backgroundColor: 'rgba(0,0,0, 0.3)' }}
    >
      <Block
        fill
        flex={1}
        backgroundColorForce="rgba(0,0,0, 0.5)"
        paddingHorizontal={30}
        borderWidth={1}
        borderColor="neutral.200"
      >
        <Block
          fill
          backgroundColour={'custom-wn'}
          borderRadius={8}
          padding={20}
          style={extraStyle}
        >
          <Display show={image}>
            <Image
              source={image?.source}
              width={image?.width}
              height={image?.height}
            />
            <Block height={20} />
          </Display>
          <Display show={title}>
            <Text
              fill
              center
              fontWeight="600"
              marginBottom={12}
              variant="title2"
            >
              {title}
            </Text>
          </Display>
          <Display show={subtitle}>
            <Text fill center variant="body" size="md">
              {subtitle}
            </Text>
          </Display>
          <Display show={buttons}>
            <Block fill flexDirection="row" marginTop={20}>
              {buttons?.map((item, index) => {
                const isLast = index === buttons.length - 1;
                return (
                  <Button
                    key={index}
                    variant={item.variant}
                    text={item.text}
                    marginRight={!isLast ? 8 : 0}
                    fillInRow
                    onPress={() => onPressButton(item.type)}
                  />
                );
              })}
            </Block>
          </Display>
        </Block>
      </Block>
    </Modal>
  );
}
