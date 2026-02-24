import { Icon, Text } from 'components/CoreComponents';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { OnboardingOption } from '../Onboarding.types';

const ACCENT = '#14EDB9';
const CARD_BG_DEFAULT = 'rgba(255,255,255,0.08)';
const CARD_BG_SELECTED = 'rgba(20,237,185,0.2)';
const BORDER_SELECTED = ACCENT;

interface OnboardingOptionItemProps {
  option: OnboardingOption;
  selected: boolean;
  onToggle: () => void;
  /** Liste stilinde (sol ikon + metin + sağ radio) mi, grid kart stilinde mi */
  layout?: 'list' | 'grid';
}

export function OnboardingOptionItem({
  option,
  selected,
  onToggle,
  layout = 'list',
}: OnboardingOptionItemProps) {
  if (layout === 'grid') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggle}
        style={[styles.gridCard, selected && styles.gridCardSelected]}
      >
        {option.icon && (
          <View style={styles.gridIcon}>
            <Icon
              name={option.icon}
              size={28}
              color={selected ? 'green.600' : 'neutral.500'}
            />
          </View>
        )}
        <Text
          variant="text"
          size="sm"
          color="neutral.950"
          numberOfLines={2}
          style={styles.gridLabel}
        >
          {option.label}
        </Text>
        {selected && (
          <View style={styles.gridCheck}>
            <Icon name="s:check" size={18} color="green.600" />
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      style={[styles.listCard, selected && styles.listCardSelected]}
    >
      {option.icon && (
        <View style={styles.listIcon}>
          <Icon
            name={option.icon}
            size={22}
            color={selected ? 'green.600' : 'neutral.500'}
          />
        </View>
      )}
      <Text
        variant="text"
        size="lg"
        color="neutral.950"
        style={styles.listLabel}
      >
        {option.label}
      </Text>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <Icon name="s:check" size={14} color="green.600" />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: CARD_BG_DEFAULT,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  listCardSelected: {
    backgroundColor: CARD_BG_SELECTED,
    borderColor: BORDER_SELECTED,
  },
  listIcon: {
    marginRight: 12,
  },
  listLabel: {
    flex: 1,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: BORDER_SELECTED,
    backgroundColor: 'rgba(20,237,185,0.3)',
  },
  gridCard: {
    flex: 1,
    minWidth: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: CARD_BG_DEFAULT,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridCardSelected: {
    backgroundColor: CARD_BG_SELECTED,
    borderColor: BORDER_SELECTED,
  },
  gridIcon: {
    marginBottom: 8,
  },
  gridLabel: {
    textAlign: 'center',
  },
  gridCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
