import DeliveryAddresses from './DeliveryAddresses';
import useUser from '@/hooks/user/useUser';
import SecondaryTopNavigationBar from '@/components/user/SecondaryTopNavigationBar';
import Box from "@mui/material/Box";

function AddressPage() {
    const { user } = useUser();
   
    return (
    <div>
     <SecondaryTopNavigationBar returnPrevLink={-1} label="Address List" />
     <Box margin={1} >
     {Array.isArray(user?.addresses) && user?.addresses.map((address, index) => (
       <DeliveryAddresses key={address._id} address={address} index={index} />
     ))}
     </Box>
    </div>
    );
   }
   
   export default AddressPage;
   