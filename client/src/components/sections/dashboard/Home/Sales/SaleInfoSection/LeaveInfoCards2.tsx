import { Stack } from '@mui/material';
import { saleInfoData } from 'data/sale-info-data_2';
import SaleInfo from './LeaveInfo';

const SaleInfoCards = () => {
  return (
    <Stack direction={{ sm: 'column' }} justifyContent={{ sm: 'space-between' }} gap={3.75}>
      {saleInfoData.map((saleInfoDataItem) => (
        <SaleInfo
          key={saleInfoDataItem.id}
          title={saleInfoDataItem.title}
          image={saleInfoDataItem.image}
          sales={saleInfoDataItem.sales}
          increment={saleInfoDataItem.increment}
          date={saleInfoDataItem.date}
        />
      ))}
    </Stack>
  );
};

export default SaleInfoCards;
