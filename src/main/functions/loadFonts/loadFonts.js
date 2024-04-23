import fontList from 'font-list'

export default async function loadFonts(mainWindow) {
  const list = await fontList.getFonts();
  mainWindow.webContents.send('fontsList', list);

}

//No results found
/* ipcMain.on('getFontList', async ()=>{
   const list = await fontList.getFonts();
   mainWindow.webContents.send('fontsList', list);
 })*/