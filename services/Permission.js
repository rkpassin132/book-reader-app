import React from 'react';
import {Platform} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export default class Permission extends React.Component {
  constructor() {
    super();
  }

  async StorageWrite({requestPermission = false, mandatory = false}) {
    if (Platform.OS === 'android') {
      let data = {
        permission: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        requestPermission: requestPermission,
        mandatory: mandatory,
        title: 'App required Storage permission',
        message:
          'We required Storage permission in order to download video, Please grant us.',
      };
      return await this.callPermission(data);
    } else {
      return {
        checkResult: {result: true, type: RESULTS.GRANTED},
        requestResult: {result: true},
      };
    }
  }

  async callPermission({
    permission,
    requestPermission,
    mandatory,
    title,
    message,
  }) {
    let result = {checkResult: {}, requestResult: {}};
    result.checkResult = await this.checkPermission(permission);
    if (
      !result.checkResult.result &&
      (result.checkResult.type == RESULTS.DENIED ||
        result.checkResult.type == RESULTS.BLOCKED)
    ) {
      if (requestPermission) {
        let rationale = {title: title, message: message, buttonNeutral: 'ok'};
        if (!mandatory) {
          rationale['buttonNegative'] = 'Cancel';
          rationale['buttonNeutral'] = 'Ask me later';
        }
        result.requestResult['result'] = await this.requestPermission(
          permission,
          rationale,
        );
        return result;
      }
    }
    return result;
  }

  async checkPermission(permission) {
    return new Promise((resolve) => {
      check(permission)
        .then((result) => {
          let checkResult = {result: false, type: null};
          switch (result) {
            case RESULTS.UNAVAILABLE:
              checkResult.type = RESULTS.UNAVAILABLE;
              break;
            case RESULTS.DENIED:
              checkResult.type = RESULTS.DENIED;
              break;
            case RESULTS.LIMITED:
              checkResult.type = RESULTS.LIMITED;
              break;
            case RESULTS.GRANTED:
              checkResult.result = true;
              checkResult.type = RESULTS.GRANTED;
              break;
            case RESULTS.BLOCKED:
              checkResult.type = RESULTS.BLOCKED;
              break;
          }
          resolve(checkResult);
        })
        .catch((error) => {
          resolve({result: false, error: error});
        });
    });
  }

  async requestPermission(permission, rationale) {
    let granted = await request(permission, rationale);
    return (granted === RESULTS.GRANTED);
  }
}
