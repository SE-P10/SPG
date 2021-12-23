import { useToasts } from 'react-toast-notifications';
import React, { useEffect, useState } from 'react';

export const ToastNotification = (props) => {

  const onSet = props.onSet || (() => { });
  const content = props.message || props.content || false;
  //const title = props.title || 'SPG';
  const appearance = props.appearance || props.variant || 'error';
  const onClose = props.onClose || (() => { });
  const auothide = props.auothide || undefined;

  const [canNotify, setCanNotify] = useState(true)

  const { addToast } = useToasts();

  const toastData = {
    appearance: appearance,
    autoDismiss: auothide,
    onDismiss: onClose
  }

  useEffect(() => {

    if (content && canNotify) {
      addToast(content, toastData, () => {
        onSet();
        setCanNotify(true);
      });

      setCanNotify(false);
    }
  }, [canNotify, content, toastData])

  return (<></>)
}
