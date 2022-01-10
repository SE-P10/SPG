import { useToasts } from 'react-toast-notifications';
import React, { useLayoutEffect, useState } from 'react';

export const ToastNotification = (props) => {

  const onSet = props.onSet;
  const content = props.message || props.content || false;
  const appearance = props.appearance || props.variant || 'error';
  const onClose = props.onClose || undefined;
  const auothide = props.auothide || undefined;

  const [canNotify, setCanNotify] = useState(true)

  const { addToast } = useToasts();

  const toastData = {
    appearance: appearance,
    autoDismiss: auothide,
    onDismiss: onClose
  }

  useLayoutEffect(() => {

    if (content && canNotify) {
      addToast(content, toastData, () => {
        if (typeof onSet === 'function') {
          onSet();
        }
        setCanNotify(true);
      });

      setCanNotify(false);
    }
  }, [canNotify, content, toastData, onSet])

  return (<></>)
}
