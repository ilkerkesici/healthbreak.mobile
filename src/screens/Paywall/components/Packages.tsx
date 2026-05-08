import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from 'components/CoreComponents';
import { SubsPackage } from 'types/models';
import { i18n } from 'constants/i18n';
import useAppSettingsHook from 'helpers/hooks/useAppSettingsHook';

type Props = {
  packages: (SubsPackage | null | undefined)[];
  selectedPackage?: SubsPackage | null;
  onSelect: (pkg: SubsPackage) => void;
};

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function Packages({
  packages,
  selectedPackage,
  onSelect,
}: Props) {
  const { hbPaywallUnitEnabled } = useAppSettingsHook();

  const SHOW_YEARLY_PRICE_AS_ORIGINAL = !hbPaywallUnitEnabled;

  const list = packages.filter((item): item is SubsPackage => !!item);
  return (
    <Block fill>
      {list.map(pkg => {
        const selected = selectedPackage?.data?.id === pkg.data?.id;
        const isYearly = pkg.basePackage.frequent === 'yearly';
        const yearlyPriceFormatted = formatCurrency(pkg.price, pkg.currency);
        const monthlyPriceFormatted = formatCurrency(
          pkg.price / 12,
          pkg.currency,
        );
        const rawDiscountPercent =
          pkg.advantage ?? pkg.percentage ?? pkg.basePackage.percentage ?? 50;
        const discountPercent = Math.max(0, Math.round(rawDiscountPercent));
        const priceLabel = SHOW_YEARLY_PRICE_AS_ORIGINAL
          ? pkg.priceFormatted
          : isYearly
          ? monthlyPriceFormatted
          : pkg.priceFormatted;
        const frequencyLabel = SHOW_YEARLY_PRICE_AS_ORIGINAL
          ? isYearly
            ? i18n.t('paywall.new.package_card.frequency.yearly')
            : i18n.t('paywall.new.package_card.frequency.monthly')
          : i18n.t('paywall.new.package_card.frequency.monthly');

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
                  {i18n.t('paywall.new.package_card.discount_badge', {
                    percent: discountPercent,
                  })}
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
                  {pkg.basePackage.key
                    ? i18n.t(pkg.basePackage.key || '')
                    : pkg.data.title}
                </Text>
                <Text size="xs" color="neutral.500">
                  {isYearly
                    ? i18n.t('paywall.new.package_card.billed_yearly', {
                        price: yearlyPriceFormatted,
                      })
                    : i18n.t('paywall.new.cancel_anytime')}
                </Text>
              </Block>
            </Block>

            <Block alignItems="flex-end">
              <Text size="md" color="neutral.950" fontWeight="700">
                {priceLabel}
              </Text>
              <Text size="xs" color="neutral.500">
                {frequencyLabel}
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
