import {
  Asset,
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';
import ImageResizer, {
  ResizeFormat,
} from '@bam.tech/react-native-image-resizer';
import PermissionHelper from './PermissionHelper';
import { Platform } from 'react-native';

const maxWidth = 1440;
const maxHeight = 1080;
class ImagePicker {
  async pickPhoto(n = 1): Promise<Asset[]> {
    console.log('pickPhoto');
    const permissionResult = await PermissionHelper.checkGaleryPermission();
    console.log('permissionResult', permissionResult);
    if (!permissionResult) {
      const newResult = await PermissionHelper.requestGaleryPermission();
      if (!newResult) {
        return [];
      }
    }
    try {
      const result = await launchImageLibrary({
        selectionLimit: n,
        mediaType: 'photo',
        includeExtra: true,
      });

      if (!result.assets) {
        return [];
      }

      return result.assets;
    } catch (e) {
      return [];
    }
  }

  async resizeImage(assets: Asset[]): Promise<Asset[]> {
    const newAssets: Asset[] = [];
    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];

      const fileType = getFileExtentionTypeFromUri(asset.uri);
      if (asset.width && asset.height && asset.uri && fileType) {
        const { width, height, resizeRequire } = getMaxResizeResolution(
          asset.width,
          asset.height,
          maxWidth,
          maxHeight,
        );
        if (!resizeRequire) {
          newAssets.push(asset);
        } else {
          try {
            const response = await ImageResizer.createResizedImage(
              asset.uri,
              width,
              height,
              fileType,
              100,
            );
            newAssets.push({
              ...asset,
              uri: response.uri,
              width: response.width,
              height: response.height,
            });
          } catch (e) {}
        }
      } else {
        newAssets.push(asset);
      }
    }
    return newAssets;
  }

  async captureImage(): Promise<Asset[]> {
    const permissionResult = await PermissionHelper.checkCameraPermission();
    if (!permissionResult) {
      const newResult = await PermissionHelper.requestCameraPermission();
      if (!newResult) {
        return [];
      }
    }
    try {
      const result = await launchCamera({
        cameraType: 'back',
        mediaType: 'photo',
        quality: 1,
      });
      if (!result.assets) {
        return [];
      }

      const assets = await this.resizeImage(result.assets);

      return assets;
    } catch (_) {
      return [];
    }
  }

  async pickPhotoNoLimit(): Promise<Asset[]> {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeExtra: true,
      });
      if (!result.assets) {
        return [];
      }
      const assets = await this.resizeImage(result.assets);

      return assets;
    } catch (_) {
      return [];
    }
  }
}

export const ImageFilePickerHelper = new ImagePicker();

const getMaxResizeResolution = (
  width: number,
  height: number,
  max_width: number,
  max_height: number,
) => {
  const ratio1 = width / max_width;
  const ratio2 = height / max_height;
  const ratio = Math.max(ratio1, ratio2);

  if (ratio > 1) {
    const new_width = Math.floor(width / ratio);
    const new_height = Math.floor(height / ratio);
    return { width: new_width, height: new_height, resizeRequire: true };
  }
  return { width, height, resizeRequire: false };
};

export const getFileTypeFromUri = (path: string) => {
  const splited = path.split('.');
  const fileType = splited[splited.length - 1];

  if (fileType === 'pdf' || fileType === 'doc') {
    return `application/${fileType}`;
  }
  return `image/${Platform.OS === 'android' ? 'jpeg' : fileType}`;
};

export const getFileExtentionTypeFromUri = (
  path?: string,
): ResizeFormat | null => {
  if (!path) {
    return null;
  }
  const splited = path.split('.');
  const fileType = splited[splited.length - 1];
  if (fileType === 'jpg') {
    return 'JPEG';
  }

  return fileType.toUpperCase() as ResizeFormat;
};
