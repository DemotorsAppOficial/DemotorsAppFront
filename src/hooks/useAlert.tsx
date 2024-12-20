import { useState, useEffect } from 'react';

interface UseAlertProps {
  duration?: number;
  animationDuration?: number;
}

export const useAlert = ({
  duration = 3000,
  animationDuration = 2500,
}: UseAlertProps) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [animationClass, setAnimationClass] = useState<string>('');

  useEffect(() => {
    setAnimationClass('slide-in');
    setShowAlert(true);

    const timer = setTimeout(() => {
      setAnimationClass('slide-out');
    }, animationDuration);

    const hideTimer = setTimeout(() => {
      setShowAlert(false);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [duration, animationDuration]);

  return { showAlert, animationClass };
};
