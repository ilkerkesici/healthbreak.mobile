// GaussianChart.tsx (güncel)
import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import Svg, {
  Defs, LinearGradient, Stop, Path, Polygon, G, Text as SvgText,
} from 'react-native-svg';

type Props = {
  width: number;
  height?: number;
  value: number;      // 0..1
  mean?: number;      // 0..1
  sigma?: number;     // 0.10–0.30 önerilir
  gradient?: [string, string];
  stroke?: string;
  text?: string;
};

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const GaussianChart: React.FC<Props> = ({
  width,
  height = 180,
  value,
  mean = 0.5,
  sigma = 0.18,
  gradient = ['#4B1EFF', '#7E59FF'],
  stroke = 'white',
  text = "You're here",
}) => {
  const w = Math.max(1, width);
  const h = Math.max(80, height);

  const {
    strokePath,
    fillPathPartial,
    indicatorX,
    baselineY,
  } = useMemo(() => {
    const gaussian = (x: number) => Math.exp(-0.5 * Math.pow((x - mean) / sigma, 2));

    const samples = 120;
    const leftPad = w * 0.04;
    const rightPad = w * 0.04;
    const innerW = w - leftPad - rightPad;
    const topPad = h * 0.08;
    const baselineY = h - 22;

    const maxY = gaussian(mean);

    const pts: { x: number; y: number; t: number }[] = [];
    for (let i = 0; i <= samples; i++) {
      const t = i / samples; // 0..1
      const gy = gaussian(t) / maxY; // 0..1
      const x = leftPad + t * innerW;
      const y = topPad + (1 - gy) * (h - topPad - 34);
      pts.push({ x, y, t });
    }

    // tam eğri (stroke)
    let strokePath = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) strokePath += ` L ${pts[i].x} ${pts[i].y}`;

    // işaretçi konumu
    const v = clamp01(value);
    const indicatorX = leftPad + v * innerW;

    // --- SADECE value'ya kadar DOLGU ---
    // value'nin tam y'sini hesapla (enterpolasyon yerine direkt fonksiyon)
    const gyV = gaussian(v) / maxY;
    const yAtV = topPad + (1 - gyV) * (h - topPad - 34);

    // sol uçtan başlayıp value noktasına kadar path
    let fillPathPartial = `M ${pts[0].x} ${baselineY} L ${pts[0].x} ${pts[0].y}`;
    // value'dan küçük noktaları ekle
    for (let i = 1; i < pts.length; i++) {
      if (pts[i].t >= v) {
        // value noktasını ekle ve aşağı kapan
        fillPathPartial += ` L ${indicatorX} ${yAtV}`;
        break;
      }
      fillPathPartial += ` L ${pts[i].x} ${pts[i].y}`;
    }
    // aşağı in ve tabana dön
    fillPathPartial += ` L ${indicatorX} ${baselineY} L ${pts[0].x} ${baselineY} Z`;

    return { strokePath, fillPathPartial, indicatorX, baselineY };
  }, [w, h, value, mean, sigma]);

  const triangle = 10;

  return (
    <View style={{ width: w, height: h }}>
      <Svg width={w} height={h}>
        <Defs>
          <LinearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={gradient[0]} stopOpacity="1" />
            <Stop offset="100%" stopColor={gradient[1]} stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* Sadece value'ya kadar dolgu */}
        {value > 0 && <Path d={fillPathPartial} fill="url(#g)" />}

        {/* Eğri */}
        <Path d={strokePath} stroke={stroke} strokeWidth={2} fill="none" strokeLinecap="round" />

        {/* İşaretçi */}
        <G>
          <Polygon
            points={`${indicatorX},${baselineY - triangle}
                     ${indicatorX - triangle},${baselineY}
                     ${indicatorX + triangle},${baselineY}`}
            fill="white"
          />
          <SvgText
            x={indicatorX}
            y={baselineY + 18}
            fontSize={14}
            fontWeight="600"
            fill="white"
            textAnchor="middle"
          >
            {text}
          </SvgText>
        </G>
      </Svg>
    </View>
  );
};

export default memo(GaussianChart);
