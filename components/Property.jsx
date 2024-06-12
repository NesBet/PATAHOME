import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import DefaultImage from '../assets/images/house.jpg';

// Property component for displaying individual property details
const Property = ({ property: { coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalID  } }) => {

  return (
    // Link to the property details page
    <Link href={`/property/${externalID}`} passHref>
      <Flex flexWrap='wrap' w='420px' p='5' paddingTop='20px' justifyContent='flex-start' cursor='pointer' >
        <Box>
          {/* Display property image or a default image if not available */}
          <Image src={coverPhoto ? coverPhoto.url : DefaultImage} width={400} height={260} />
        </Box>
        <Box w='full'>
          <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center'>
              <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified />}</Box> {/* Display verified icon if property is verified */}
              {/* Display property price and rent frequency */}
              <Text fontWeight='bold' fontSize='lg'>KSH {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
            </Flex>
            <Box>
              {/* Display agency logo */}
              <Avatar size='sm' src={agency?.logo?.url}></Avatar>
            </Box>
          </Flex>
          <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
            {/* Display property details: rooms, baths, and area */}
            {rooms}
            <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
          </Flex>
          {/* Display property title, truncate if it's too long */}
          <Text fontSize='lg'>
            {title.length > 30 ? title.substring(0, 30) + '...' : title}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default Property;