"use client";

import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  NativeSelect,
  Text,
} from "@chakra-ui/react";
import type { Category, EventsFilters } from "@/types/api.types";

interface EventsFiltersProps {
  filters: EventsFilters;
  categories: Category[];
  onFilterChange: (
    key: keyof EventsFilters | string,
    value: string | number | null | undefined,
  ) => void;
  onReset: () => void;
}

export default function EventsFilters({
  filters,
  categories,
  onFilterChange,
  onReset,
}: EventsFiltersProps) {
  return (
    <Box
      p={5}
      mb={8}
      borderRadius="xl"
      border="1px solid"
      borderColor="border"
      _dark={{ borderColor: "gray.800" }}
      bg="gray.50"
    >
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
        mb={4}
      >
        <Box>
          <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
            Search
          </Text>
          <Input
            placeholder="Title, description..."
            variant="outline"
            size="sm"
            bg="white"
            _dark={{ bg: "gray.800" }}
            value={filters?.search ?? ""}
            onChange={(e) =>
              onFilterChange("search", e.target.value || undefined)
            }
          />
        </Box>

        <Box>
          <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
            Lieu
          </Text>
          <Input
            placeholder="Antananarivo..."
            variant="outline"
            size="sm"
            bg="white"
            _dark={{ bg: "gray.800" }}
            value={filters?.location ?? ""}
            onChange={(e) =>
              onFilterChange("location", e.target.value || undefined)
            }
          />
        </Box>

        <Box>
          <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
            Category
          </Text>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              bg="white"
              _dark={{ bg: "gray.800" }}
              value={filters?.categoryId ?? ""}
              onChange={(e) =>
                onFilterChange("categoryId", e.target.value || undefined)
              }
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </NativeSelect.Field>
          </NativeSelect.Root>
        </Box>

        <Box>
          <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
            From
          </Text>
          <Input
            type="date"
            size="sm"
            bg="white"
            _dark={{ bg: "gray.800" }}
            value={filters?.dateFrom ? filters.dateFrom.split("T")[0] : ""}
            onChange={(e) =>
              onFilterChange(
                "dateFrom",
                e.target.value ? `${e.target.value}T00:00:00.000Z` : null,
              )
            }
          />
        </Box>

        <Box>
          <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
            To
          </Text>
          <Input
            type="date"
            size="sm"
            bg="white"
            _dark={{ bg: "gray.800" }}
            value={filters?.dateTo ? filters.dateTo.split("T")[0] : ""}
            onChange={(e) =>
              onFilterChange(
                "dateTo",
                e.target.value ? `${e.target.value}T23:59:59.999Z` : null,
              )
            }
          />
        </Box>

        <Box>
          <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
            Max price (Ar)
          </Text>
          <Input
            type="number"
            placeholder="Ex: 50000"
            size="sm"
            bg="white"
            _dark={{ bg: "gray.800" }}
            value={filters?.priceMax ?? ""}
            onChange={(e) =>
              onFilterChange(
                "priceMax",
                e.target.value ? Number(e.target.value) : undefined,
              )
            }
          />
        </Box>

        <Box>
          <Text fontSize="xs" fontWeight="medium" color="gray.500" mb={1}>
            Sort by
          </Text>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              bg="white"
              _dark={{ bg: "gray.800" }}
              value={filters?.sortBy ?? "eventDate"}
              onChange={(e) => onFilterChange("sortBy", e.target.value)}
            >
              <option value="eventDate">Event date</option>
              <option value="createdAt">Publication date</option>
              <option value="title">Title</option>
            </NativeSelect.Field>
          </NativeSelect.Root>
        </Box>

        <Box>
          <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
            Order
          </Text>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              bg="white"
              _dark={{ bg: "gray.800" }}
              value={filters?.sortOrder ?? "asc"}
              onChange={(e) => onFilterChange("sortOrder", e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </NativeSelect.Field>
          </NativeSelect.Root>
        </Box>
      </Grid>

      <Flex justify="flex-end">
        <Button size="sm" variant="ghost" colorPalette="gray" onClick={onReset}>
          Reset all filters
        </Button>
      </Flex>
    </Box>
  );
}
