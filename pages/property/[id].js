import { Box, Flex, Spacer, Text, Button } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath, FaWhatsapp, FaArrowLeft } from 'react-icons/fa'; // Added FaArrowLeft icon
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { baseUrl, fetchApi } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';

// PropertyDetails component displays detailed information about a property
const PropertyDetails = ({ propertyDetails: { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos }, propertyId }) => {
  const propertyLink = `https://patahome-v2.vercel.app/property/${propertyId}`;
  const whatsappMessage = `Hello, I am interested in the property at ${title} listed for KSH ${millify(price)}${rentFrequency && `/${rentFrequency}`} \n ${propertyLink}`; // Message for WhatsApp

  // Function to handle the back button click event
  const handleGoBack = () => {
    window.history.back();
  };

  // Display images if available
  return (
    <Box maxWidth='1000px' margin='auto' p='4'>
      {photos && <ImageScrollbar data={photos} />}
      <Box w='full' p='6'>
        <Flex paddingTop='2' alignItems='center'>
          <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified />}</Box>
          <Text fontWeight='bold' fontSize='lg'>
            KSH {price} {rentFrequency && `/${rentFrequency}`}
          </Text>
          <Spacer />
          <Avatar size='sm' src={agency?.logo?.url}></Avatar>
        </Flex>
        <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
          {rooms}<FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
        </Flex>
      </Box>
      <Button
        leftIcon={<FaArrowLeft />} // Added back button icon
        colorScheme="red"
        variant="outline"
        mt={2}
        onClick={handleGoBack} // Added onClick event handler
      >
        Back
      </Button>
      <Box marginTop='2'>
        <Text fontSize='lg' marginBottom='2' fontWeight='bold'>{title}</Text>
        <Text lineHeight='2' color='gray.600'>{description}</Text>
      </Box>
      <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>
        <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
          <Text>Type</Text>
          <Text fontWeight='bold'>{type}</Text>
        </Flex>
        <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
          <Text>Purpose</Text>
          <Text fontWeight='bold'>{purpose}</Text>
        </Flex>
        {furnishingStatus && (
          <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3' >
            <Text>Furnishing Status</Text>
            <Text fontWeight='bold'>{furnishingStatus}</Text>
          </Flex>
        )}
      </Flex>
      <Box>
        {amenities.length && <Text fontSize='2xl' fontWeight='black' marginTop='5'>Facilites:</Text>}
          <Flex flexWrap='wrap'>
            {amenities?.map((item) => (
                item?.amenities?.map((amenity) => (
                  <Text key={amenity.text} fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
                    {amenity.text}
                  </Text>
                ))
            ))}
          </Flex>
      </Box>
      <Button // Whatsapp button
        as="a"
        href={`https://wa.me/254794249775?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        leftIcon={<FaWhatsapp />}
        colorScheme="whatsapp"
        variant="solid"
        mt={2}
      >
        WhatsApp
      </Button>
    </Box>
  );
};

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  if (!data) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      propertyDetails: data,
      propertyId: id,
    },
  };
}