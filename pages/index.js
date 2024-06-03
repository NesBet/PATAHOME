import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import Property from '../components/Property';

import { baseUrl, fetchApi } from '../utils/fetchApi';

export const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Box
  mt={8}
    bgImage={`url(${imageUrl})`}
    bgPosition="center"
    bgRepeat="no-repeat"
    bgSize="cover"
    position="relative"
    height="400px"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    color="white"
    p={4}
  >
    <Text fontSize="2xl" fontWeight="bold" color="red">{purpose}</Text>
    <Text fontSize="4xl" fontWeight="bold" color="blue">{title1}</Text>
    <Text fontSize="4xl" fontWeight="bold" color="blue">{title2}</Text>
    <Text fontSize="2xl" fontWeight="bold" color="red">{desc1}</Text>
    <Text fontSize="2xl" fontWeight="bold" color="red">{desc2}</Text>
    <Link href={linkName}>
      <Button colorScheme="blue">{buttonText}</Button>
    </Link>
  </Box>
);


const Home = ({ propertiesForSale, propertiesForRent }) => (
  <Box>
    <Banner
      purpose='RENT A HOME'
      title1='Beautiful Homes for'
      title2='EVERYONE'
      desc1=' Explore from Apartments, builder floors, villas, '
      desc2=' studios and more'
      buttonText='Explore Rentals'
      linkName='/search?purpose=for-rent'
      imageUrl='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.mos.cms.futurecdn.net%2F2XynkqtmYSY9wte5fp7Tyd.jpg&f=1&nofb=1&ipt=62c1baa7488202b3c3cb1d4f28820971fe83926c4386c3cb56ddfefc440c13fe&ipo=images'
    />
    <Flex flexWrap='wrap'>
      {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
    </Flex>
    <Banner
      purpose='BUY A SPACE'
      title1=' Buy & Own Your '
      title2=' DREAM HOME TODAY '
      desc1=' Explore from Apartments, land, builder floors,'
      desc2=' Bungalows and more'
      buttonText='Explore Buying'
      linkName='/search?purpose=for-sale'
      imageUrl='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages4.alphacoders.com%2F829%2F829688.jpg&f=1&nofb=1&ipt=feec2cedc80b50162d11275d3eecf7be995fa334eb08140bca1f01a44b163983&ipo=images'
    />
    <Flex flexWrap='wrap'>
      {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
    </Flex>
  </Box>
);

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=12`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=12`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

export default Home;
