export const putToS3 = async (
  signedUrl: string,
  asset: { uri: string; type?: string },
) => {
  console.log('start upload', asset);
  // 1) Yerel dosyayı blob’a çevir
  const fileResp = await fetch(asset.uri);
  const blob = await fileResp.blob(); // RN'de desteklenir

  console.log('blob', blob);

  // 2) S3 presigned URL'e yükle
  const putResp = await fetch(signedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': asset.type ?? 'application/octet-stream',
    },
    body: blob,
  });
  console.log('putResp', putResp);
  if (!putResp.ok) {
    const msg = await putResp.text().catch(() => '');
    return null;
  }

  return signedUrl.split('?')[0];
};
