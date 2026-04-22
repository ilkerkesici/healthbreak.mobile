import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from 'components/CoreComponents';
import { SubsPackage } from 'types/models';

type Props = {
  packages: (SubsPackage | null | undefined)[];
  selectedPackage?: SubsPackage | null;
  onSelect: (pkg: SubsPackage) => void;
};

function getFrequencyLabel(pkg: SubsPackage) {
  const key = pkg.key || '';
  if (key.includes('1year')) return 'YILLIK';
  if (key.includes('1month')) return 'AYLIK';
  return 'PLAN';
}

export default function Packages({ packages, selectedPackage, onSelect }: Props) {
  const list = packages.filter((item): item is SubsPackage => !!item);

  return (
    <Block fill>
      {list.map(pkg => {
        const selected = selectedPackage?.data?.id === pkg.data?.id;
        const isYearly = (pkg.key || '').includes('1year');

        return (
          <TouchableOpacity
            key={pkg.data.id}
            activeOpacity={0.8}
            onPress={() => onSelect(pkg)}
            style={[styles.item, selected ? styles.itemSelected : undefined]}
          >
            {isYearly ? (
              <Block style={styles.badge}>
                <Text size="xs" color="custom-wb" fontWeight="700">
                  %50 TASARRUF
                </Text>
              </Block>
            ) : null}

            <Block flexDirection="row" alignItems="center">
              <Block
                width={18}
                height={18}
                borderRadius={9}
                borderWidth={1}
                borderColor={selected ? 'primary.500' : 'neutral.300'}
                justifyContent="center"
                alignItems="center"
              >
                {selected ? (
                  <Block
                    width={8}
                    height={8}
                    borderRadius={4}
                    backgroundColour="primary.500"
                  />
                ) : null}
              </Block>

              <Block marginLeft={10}>
                <Text size="md" color="neutral.950" fontWeight="700">
                  {isYearly ? 'Yıllık Plan' : 'Aylık Plan'}
                </Text>
                <Text size="xs" color="neutral.500">
                  {isYearly
                    ? '63,99/ay olarak faturalandırılır'
                    : 'İstediğin zaman iptal et'}
                </Text>
              </Block>
            </Block>

            <Block alignItems="flex-end">
              <Text size="md" color="neutral.950" fontWeight="700">
                {pkg.priceFormatted}
              </Text>
              <Text size="xs" color="neutral.500">
                {getFrequencyLabel(pkg)}
              </Text>
            </Block>
          </TouchableOpacity>
        );
      })}
    </Block>
  );
}

const styles = StyleSheet.create({
  item: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F7F7',
    position: 'relative',
  },
  itemSelected: {
    borderColor: '#14EDB9',
    backgroundColor: '#ECFFFA',
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: 10,
    backgroundColor: '#14EDB9',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
});

