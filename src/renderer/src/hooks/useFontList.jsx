const { ipcRenderer } = window.require('electron');
import { useEffect, useState } from 'react';
import NativeFontList from "./nativeFontList";

const useFontList = () => {

  const [fontList, setFontList] = useState()

  useEffect(() => {

    //ipcRenderer.send('getFontList');

    const handleFontList = (event, fonts) => {
      const nativeList = NativeFontList();
      const fullList = [
        ...nativeList,
        ...(fonts ?? null),
      ]
      setFontList(fullList)
    };

    ipcRenderer.on('fontsList', handleFontList);

    return () => {
      ipcRenderer.removeListener('fontsList', handleFontList);
    };
  }, []);

  return fontList
};

export default useFontList;