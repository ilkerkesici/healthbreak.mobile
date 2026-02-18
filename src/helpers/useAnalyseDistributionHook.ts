import { useEffect } from 'react';
import { useAnalyseDistributionStore } from 'store/useAnalyseDistributionStore';

const useAnalyseDistributionHook = (
  requestID: string,
  key: string,
  value: number,
) => {
  const { analyseDistribution, setAnalyseDistribution } =
    useAnalyseDistributionStore();
  const mergedKey = `${key}-${requestID}`;

  useEffect(() => {
    if (analyseDistribution[mergedKey]) {
      return;
    }
    const approximatePercentage = mixedPercentile(value);

    setAnalyseDistribution({
      ...analyseDistribution,
      [mergedKey]: {
        id: mergedKey,
        name: key,
        value,
        percentage: approximatePercentage,
      },
    });
  }, [
    analyseDistribution,
    mergedKey,
    key,
    requestID,
    setAnalyseDistribution,
    value,
  ]);

  const currentAnalyseDistribution = Math.floor(
    analyseDistribution[mergedKey]?.percentage || 0,
  );

  return { currentAnalyseDistribution };
};

export default useAnalyseDistributionHook;

function mixedPercentile(userScore: number, jitterRange = 5, probExact = 0.3) {
  // Skoru normalize et
  let norm = (userScore - 40) / (100 - 40);
  norm = Math.max(0, Math.min(1, norm));
  let basePercentile = norm * 100;

  if (Math.random() < probExact) {
    // %30 ihtimalle tam değer
    return Math.round(basePercentile * 100) / 100;
  } else {
    // %70 ihtimalle jitter
    let jitter = Math.random() * 2 * jitterRange - jitterRange; // -jitterRange..+jitterRange
    let approx = basePercentile + jitter;
    return Math.round(Math.max(0, Math.min(100, approx)) * 100) / 100;
  }
}
