import { Dispatch } from 'redux';
import Axios from 'axios';
import { getFileNameFromHeader } from '../../../utils/routeUtil';

export const requestDecryptPersonalSharedFile = (
  shareId: string,
  shareToken: string
) => async (dispatch: Dispatch) => {
  try {
    const response = await Axios.post(
      `/api/v1/info-share/${shareId}/file`,
      {
        shareToken
      },
      { responseType: 'blob' }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    const downloadedFileName = getFileNameFromHeader(response.headers);
    link.setAttribute('download', downloadedFileName); //or any other extension
    document.body.appendChild(link);
    link.click();
  } catch (e) {
    alert(e.message);
  }
};

export const requestDecryptPersonalSharedInfo = (
  shareId: string,
  shareToken: string
) => async (dispatch: Dispatch) => {
  try {
    const response = await Axios.post(`/api/v1/info-share/${shareId}`, {
      shareToken
    });
    alert(JSON.stringify(response.data.data.secret));
  } catch (e) {
    alert(e);
  }
};
