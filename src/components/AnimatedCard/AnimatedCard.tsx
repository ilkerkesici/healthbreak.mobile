import { Block } from 'components/CoreComponents';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { DesignProps } from 'types/design';

interface Props extends DesignProps {
  children?: React.ReactNode;
}

const AnimatedCard = ({ children, ...props }: Props) => {
  return (
    <Block {...props} style={styles.container}>
      {children}
    </Block>
  );
};

export default memo(AnimatedCard);

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: '#FF00FF',
  },
});
