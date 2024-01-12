import { apiSlice } from "@/utils/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({
        query,
        page = 1,
        limit = 10,
        categories,
        unitPriceGte,
        unitPriceLte,
        sort,
        averageRatingGte,
        q,
      }) => {
        const params = new URLSearchParams({
          limit,
          page,
        });

        if (q) {
          params.append("q", q);
        }
        if (query) {
          categories = ""; // Set categories to an empty string, if query is true
        }
        if (categories) {
          params.append("categories", categories);
        }
        if (unitPriceGte) {
          params.append("unitPrice[gte]", unitPriceGte);
        }
        if (unitPriceLte) {
          params.append("unitPrice[lte]", unitPriceLte);
        }
        if (averageRatingGte) {
          params.append("averageRating[gte]", averageRatingGte);
        }
        if (sort) {
          params.append("sort", sort);
        }

        const url = query ? `/products/${query}` : "/products";
        return { url, params };
      },
      transformResponse: (response) => {
        return {
          data: response.data.docs,
          metadata: { ...response.data.metadata },
        };
      },
      providesTags: ["Product"],
    }),

    getProducts: builder.query({
      query: ({ pageNumber }) => `/products/?limit=10&page=${pageNumber}`,
      providesTags: ["Product"],
      transformResponse: (response) => {
        if (response?.docs?.data) {
          const uniqueData = response?.docs?.data.filter(
            (value, index, self) => {
              return self.findIndex((item) => item._id === value._id) === index;
            }
          );
          return uniqueData;
        }
        return response;
      },
    }),

    getCategory: builder.query({
      query: () => `category`,
      providesTags: ["Product"],
      transformResponse: (response) => {
        console.log(response);
        if (response?.data?.data) {
          return response?.data?.data;
        }
        return response;
      },
    }),

    getProductById: builder.query({
      query: (productId) => `/products/${productId}`,
      providesTags: ["Product"],
      transformResponse: (response) => {
        return response.data;
      },
    }),
  }),
});
export const {
  useGetAllProductsQuery,
  useGetProductsQuery,
  useGetCategoryQuery,
  useGetProductByIdQuery,
} = extendedApiSlice;
