import XLSX from 'xlsx';

export const ExcelBuilder = {
  createXlsDoc(returnNumber: string, comment: string) {
    console.log('Prepare excel file')
    const shippedToMerchantList = [{ class: returnNumber, class2: comment }];
    const workBook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(shippedToMerchantList, {
      skipHeader: true,
    });
    XLSX.utils.book_append_sheet(workBook, sheet, 'ReturnsList');
    XLSX.writeFile(workBook, 'src/features/shippedToMerchant/fixtures/shippedToMerchantList.xlsb');
    //XLSX.writeFile(workBook, 'src/testsCriticalPath/fixtures/shippedToMerchant/shippedToMerchantList.xlsb');
  },
};
