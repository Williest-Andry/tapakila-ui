import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";

export function EventCardSkeleton() {
  return (
    <Box
      borderRadius="xl"
      overflow="hidden"
      border="1px solid"
      borderColor="border"
      _dark={{ borderColor: "gray.800" }}
      bg="white"
    >
      <Skeleton h="200px" w="100%" />
      <Box p={4}>
        <SkeletonText noOfLines={2} mb={3} />
        <SkeletonText noOfLines={2} />
      </Box>
    </Box>
  );
}

export function EventsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        sm: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={6}
    >
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </Grid>
  );
}

export function EventDetailSkeleton() {
  return (
    <Box maxW="4xl" mx="auto" px={4} py={8}>
      <Skeleton h="400px" borderRadius="xl" mb={6} />
      <SkeletonText noOfLines={3} mb={4} />
      <SkeletonText noOfLines={5} />
    </Box>
  );
}
