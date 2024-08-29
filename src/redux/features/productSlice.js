import axios from '../../utils/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const getAllProducts = createAsyncThunk(
    `customer/products`,
    async (data) => {
        const response = await axios.get('products/list', {
            params: {
                search: data?.search,
            },
        });
        return response;
    }
);

export const getAdminProducts = createAsyncThunk(
    `admin/getAdminProducts`,
    async (data) => {
        const response = await axios.get('admin/products', {
            params: {
                search: data?.search,
            },
        });
        return response;
    }
);

export const AddProducts = createAsyncThunk(
    `customer/products`,
    async (data) => {
        const response = await axios.post('admin/products', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    }
);

export const getSingleProduct = createAsyncThunk(
    `customer/getSingleProduct`,
    async (id) => {
        const response = await axios.get(`products/find/${id}`);
        return response;
    }
);

export const getCoupon = createAsyncThunk(
    `customer/getCoupon`,
    async (id) => {
        const response = await axios.get(`/admin/coupons/list`);
        return response;
    }
);
export const addtocart = createAsyncThunk(
    `customer/addToCart`,
    async (data) => {
        const response = await axios.post(`carts/add`, data);
        return response;
    }
);

export const getcartData = createAsyncThunk(
    'customer/getcartData',
    async (data) => {
        const response = await axios.get(`carts/in-cart`);
        return response.data;
    }
);

export const RemoveFromCart = createAsyncThunk(
    'order/RemoveFromCart',
    async (data) => {
        const response = await axios.post(`carts/remove`, data);
        return response.data;
    }
);

export const getcategories = createAsyncThunk(
    'customer/getcategories',
    async (data) => {
        const response = await axios.get(`products/categories/list`);
        return response.data;
    }
);

export const getAdmincategories = createAsyncThunk(
    'admin/getAdmincategories',
    async (data) => {
        const response = await axios.get(`admin/product-categories`);
        return response.data;
    }
);

export const addAdmincategories = createAsyncThunk(
    'admin/addAdmincategories',
    async (data) => {
        const response = await axios.post(`admin/product-categories`, data);
        return response.data;
    }
);

export const updateAdminCats = createAsyncThunk(
    'admin/updateAdminCats',
    async (data) => {
        const response = await axios.post(`admin/product-categories/update/${data.id}`, data.data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
);
export const getSingleCats = createAsyncThunk(
    `customer/getSingleCats`,
    async (id) => {
        const response = await axios.get(`products/list?category_id=${id}`);
        return response;
    }
);

//chekout

export const addtocheckout = createAsyncThunk(
    `customer/checkout`,
    async (data) => {
        const response = await axios.post(`checkout`, data);
        return response;
    }
);

export const verifyPayment = createAsyncThunk(
    `customer/verifyPayment`,
    async (data) => {
        const response = await axios.post(`checkout/verify`, {
            reference: data,
        });
        return response;
    }
);

export const orderHistory = createAsyncThunk(
    `admin/orderHistory`,
    async (data) => {
        const response = await axios.get(`admin/orders`);
        return response;
    }
);

export const orderHistoryId = createAsyncThunk(
    `admin/orderHistoryId`,
    async (data) => {
        const response = await axios.get(`admin/orders/${data}`);
        return response.data;
    }
);
export const getStores = createAsyncThunk(`customer/getStores`, async (id) => {
    const response = await axios.get(`stores`);
    return response;
});

export const AddCoupons = createAsyncThunk(
    `customer/AddCoupons`,
    async (data) => {
        const response = await axios.post('admin/coupons/store', data);
        return response;
    }
);

export const AddAds = createAsyncThunk(
    `customer/AddAds`,
    async (data) => {
        console.log(data)
        const response = await axios.post('admin/cms/sections', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
    });
        return response;
    }
);


export const getAdsPages = createAsyncThunk(`customer/getAdsPages`, async (id) => {
    const response = await axios.get(`admin/cms/pages`);
    return response.data;
});



export const AddPgs = createAsyncThunk(
    `customer/AddPgs`,
    async (data) => {
        const response = await axios.post('admin/cms/pages', data);
        return response;
    }
);

export const favAction = createAsyncThunk(
    `customer/favAction`,
    async (data) => {
        const response = await axios.post(
            `favorites/action`,
            { product_id: data.id },
            {
                params: {
                    action: data.action,
                },
            }
        );
        return response;
    }
);

export const getFavorites = createAsyncThunk(
    `customer/getFavorites`,
    async (data) => {
        const response = await axios.get(`favorites/list`, data);
        return response;
    }
);

export const getCategoriesWithProducts = createAsyncThunk(
    'customer/getCategoriesWithProducts',
    async (_, { dispatch }) => {
        const categoriesResponse = await dispatch(getcategories());
        const categories = categoriesResponse.payload;
        console.log(categories);

        const categoriesWithProducts = await Promise.all(
            categories?.data?.slice(0, 8)?.map(async (category) => {
                const productsResponse = await dispatch(
                    getSingleCats(category.id)
                );
                console.log(productsResponse);

                const products = productsResponse.payload.data.data.data;
                return {
                    ...category,
                    products: products, // Only take the first 3 products
                };
            })
        );

        console.log('Categories with products:', categoriesWithProducts);

        return categoriesWithProducts;
    }
);

// export const contributorLogin = createAsyncThunk(
// 	`contributor/register`,
// 	async ({ createData, cateID }) => {
// 		return getCsrf().then(async () => {
// 			const response = await axios.post(
// 				`/account/contributor/categories/${cateID}/register-auth-user`,
// 				createData
// 			);
// 			return response;
// 		});
// 	}
// );

export const createLP = createAsyncThunk(
    `customer/createLP`,
    async (data) => {
        const response = await axios.post('admin/loyalty-settings', data);
        return response;
    }
);

export const getLP = createAsyncThunk(
    `customer/getLP`,
    async (data) => {
        const response = await axios.get('admin/loyalty-settings');
        return response;
    }
);

const initialState = {
    getadmincarts: {
        results: null,
        isLoading: true,
    },

    addcats: {
        results: null,
        isLoading: false,
    },
    updatecats: {
        results: null,
        isLoading: false,
    },
    addcoupon: {
        results: null,
        isLoading: false,
    },
    createlp: {
        results: null,
        isLoading: false,
    },
    getlp: {
        results: null,
        isLoading: true,
    },
    getcoup: {
        results: null,
        isLoading: true,
    },
    addadds: {
        results: null,
        isLoading: false,
    },
    getadspage: {
        results: null,
        isLoading: false,
    },
    addpage: {
        results: null,
        isLoading: false,
    },
    allproducts: {
        results: null,
        isLoading: true,
    },

    addproducts: {
        results: null,
        isLoading: false,
    },
    singleproducts: {
        results: null,
        isLoading: true,
    },

    addcart: {
        isLoading: false,
        results: null,
        success: false,
    },

    getcart: {
        isLoading: false,
        results: null,
    },

    removecart: {
        isLoading: false,
        results: null,
    },

    getcats: {
        results: null,
        isLoading: true,
    },

    singlecats: {
        results: null,
        isLoading: true,
    },

    checkout: {
        results: null,
        isLoading: false,
        success: false,
    },
    verify: {
        results: null,
        isLoading: false,
    },
    getOrder: {
        results: null,
        isLoading: true,
    },

    getOrderid: {
        results: null,
        isLoading: true,
    },

    search: {
        results: null,
        isLoading: true,
    },
    getstore: {
        results: null,
        isLoading: true,
    },

    topsell: {
        results: null,
        isLoading: true,
    },

    favaction: {
        results: null,
        isLoading: false,
    },

    getfav: {
        results: null,
        isLoading: false,
    },
    categoriesWithProducts: {
        results: null,
        isLoading: true,
    },
};

export const productSlice = createSlice({
    name: 'auth',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(getAdmincategories.pending, (state) => {
                state.getadmincarts.isLoading = true;
            })
            .addCase(getAdmincategories.fulfilled, (state, { payload }) => {
                state.getadmincarts.isLoading = false;
                state.getadmincarts.results = payload;
            })
            .addCase(getAdmincategories.rejected, (state) => {
                state.getadmincarts.isLoading = true;
            });

        builder
            .addCase(addAdmincategories.pending, (state) => {
                state.addcats.isLoading = true;
            })
            .addCase(addAdmincategories.fulfilled, (state, { payload }) => {
                state.addcats.isLoading = false;
                state.addcats.results = payload;
            })
            .addCase(addAdmincategories.rejected, (state) => {
                state.addcats.isLoading = true;
            });

            builder
            .addCase(updateAdminCats.pending, (state) => {
                state.updatecats.isLoading = true;
            })
            .addCase(updateAdminCats.fulfilled, (state, { payload }) => {
                state.updatecats.isLoading = false;
                state.updatecats.results = payload;
            })
            .addCase(updateAdminCats.rejected, (state) => {
                state.updatecats.isLoading = true;
            });
        
        
            builder
            .addCase(getAdminProducts.pending, (state) => {
                state.allproducts.isLoading = true;
            })
            .addCase(getAdminProducts.fulfilled, (state, { payload }) => {
                state.allproducts.isLoading = false;
                state.allproducts.results = payload;
            })
            .addCase(getAdminProducts.rejected, (state) => {
                state.allproducts.isLoading = true;
            });

            builder
            .addCase(getCoupon.pending, (state) => {
                state.getcoup.isLoading = true;
            })
            .addCase(getCoupon.fulfilled, (state, { payload }) => {
                state.getcoup.isLoading = false;
                state.getcoup.results = payload;
            })
            .addCase(getCoupon.rejected, (state) => {
                state.getcoup.isLoading = true;
            });

        //single products
        builder
            .addCase(getSingleProduct.pending, (state) => {
                state.singleproducts.isLoading = true;
            })
            .addCase(getSingleProduct.fulfilled, (state, { payload }) => {
                state.singleproducts.isLoading = false;
                state.singleproducts.results = payload;
            })
            .addCase(getSingleProduct.rejected, (state) => {
                state.singleproducts.isLoading = true;
            });

        //add to cart
        builder
            .addCase(addtocart.pending, (state) => {
                state.addcart.isLoading = true;
                state.addcart.success = false;
            })
            .addCase(addtocart.fulfilled, (state, { payload }) => {
                state.addcart.isLoading = false;
                state.addcart.success = true;

                state.addcart.results = payload;
                toast.success('Added to cart');
            })
            .addCase(addtocart.rejected, (state, { payload }) => {
                console.log(payload);
                state.addcart.isLoading = true;
                state.addcart.success = false;
            });

        //GET CART
        builder
            .addCase(getcartData.pending, (state) => {
                state.getcart.isLoading = true;
            })
            .addCase(getcartData.fulfilled, (state, { payload }) => {
                state.getcart.isLoading = false;
                state.getcart.results = payload;
            })
            .addCase(getcartData.rejected, (state) => {
                state.getcart.isLoading = true;
            });

                    builder
            .addCase(getAdsPages.pending, (state) => {
                state.getadspage.isLoading = true;
            })
            .addCase(getAdsPages.fulfilled, (state, { payload }) => {
                state.getadspage.isLoading = false;
                state.getadspage.results = payload;
            })
            .addCase(getAdsPages.rejected, (state) => {
                state.getadspage.isLoading = true;
            });

        //remove to cart
        builder
            .addCase(RemoveFromCart.pending, (state) => {
                state.removecart.isLoading = true;
            })
            .addCase(RemoveFromCart.fulfilled, (state, { payload }) => {
                state.removecart.isLoading = false;
                state.removecart.results = payload;
            })
            .addCase(RemoveFromCart.rejected, (state) => {
                state.removecart.isLoading = true;
            });

        //categories
        builder
            .addCase(getcategories.pending, (state) => {
                state.getcats.isLoading = true;
            })
            .addCase(getcategories.fulfilled, (state, { payload }) => {
                state.getcats.isLoading = false;
                state.getcats.results = payload;
            })
            .addCase(getcategories.rejected, (state) => {
                state.getcats.isLoading = true;
            });

        builder
            .addCase(getSingleCats.pending, (state) => {
                state.singlecats.isLoading = true;
            })
            .addCase(getSingleCats.fulfilled, (state, { payload }) => {
                state.singlecats.isLoading = false;
                state.singlecats.results = payload;
            })
            .addCase(getSingleCats.rejected, (state) => {
                state.singlecats.isLoading = true;
            });

        builder
            .addCase(addtocheckout.pending, (state) => {
                state.checkout.isLoading = true;
                state.checkout.success = false;
            })
            .addCase(addtocheckout.fulfilled, (state, { payload }) => {
                state.checkout.isLoading = false;
                state.checkout.results = payload;
                state.checkout.success = true;
            })
            .addCase(addtocheckout.rejected, (state, { payload }) => {
                console.log(payload);
                state.checkout.isLoading = true;
            });

        builder
            .addCase(verifyPayment.pending, (state) => {
                state.verify.isLoading = true;
            })
            .addCase(verifyPayment.fulfilled, (state, { payload }) => {
                state.verify.isLoading = false;
                state.verify.results = payload;
            })
            .addCase(verifyPayment.rejected, (state, { payload }) => {
                console.log(payload);
                state.verify.isLoading = true;
            });
        builder
            .addCase(orderHistory.pending, (state) => {
                state.getOrder.isLoading = true;
            })
            .addCase(orderHistory.fulfilled, (state, { payload }) => {
                state.getOrder.isLoading = false;
                state.getOrder.results = payload;
            })
            .addCase(orderHistory.rejected, (state, { payload }) => {
                state.getOrder.isLoading = true;
            });

            builder
            .addCase(orderHistoryId.pending, (state) => {
                state.getOrderid.isLoading = true;
            })
            .addCase(orderHistoryId.fulfilled, (state, { payload }) => {
                state.getOrderid.isLoading = false;
                state.getOrderid.results = payload;
            })
            .addCase(orderHistoryId.rejected, (state, { payload }) => {
                state.getOrderid.isLoading = true;
            });

            builder
            .addCase(AddCoupons.pending, (state) => {
                state.addcoupon.isLoading = true;
            })
            .addCase(AddCoupons.fulfilled, (state, { payload }) => {
                state.addcoupon.isLoading = false;
                state.addcoupon.results = payload;
                if(payload?.data?.code === 200){
                    toast.success('Coupon added successfully')
                }
            })
            .addCase(AddCoupons.rejected, (state) => {
                state.addcoupon.isLoading = true;
            });

            builder
            .addCase(AddAds.pending, (state) => {
                state.addadds.isLoading = true;
            })
            .addCase(AddAds.fulfilled, (state, { payload }) => {
                state.addadds.isLoading = false;
                state.addadds.results = payload;
            })
            .addCase(AddAds.rejected, (state) => {
                state.addadds.isLoading = true;
            });


            builder
            .addCase(createLP.pending, (state) => {
                state.createlp.isLoading = true;
            })
            .addCase(createLP.fulfilled, (state, { payload }) => {
                state.createlp.isLoading = false;
                state.createlp.results = payload;
            })
            .addCase(createLP.rejected, (state) => {
                state.createlp.isLoading = true;
            });

            builder
            .addCase(getLP.pending, (state) => {
                state.getlp.isLoading = true;
            })
            .addCase(getLP.fulfilled, (state, { payload }) => {
                state.getlp.isLoading = false;
                state.getlp.results = payload;
            })
            .addCase(getLP.rejected, (state) => {
                state.getlp.isLoading = true;
            });
            
            builder
            .addCase(AddPgs.pending, (state) => {
                state.addpage.isLoading = true;
            })
            .addCase(AddPgs.fulfilled, (state, { payload }) => {
                state.addpage.isLoading = false;
                state.addpage.results = payload;
            })
            .addCase(AddPgs.rejected, (state) => {
                state.addpage.isLoading = true;
            });

  

        builder
            .addCase(favAction.pending, (state) => {
                state.favaction.isLoading = true;
            })
            .addCase(favAction.fulfilled, (state, { payload }) => {
                state.favaction.isLoading = false;
                state.favaction.results = payload;
            })
            .addCase(favAction.rejected, (state, { payload }) => {
                state.favaction.isLoading = true;
            });

        builder
            .addCase(getFavorites.pending, (state) => {
                state.getfav.isLoading = true;
            })
            .addCase(getFavorites.fulfilled, (state, { payload }) => {
                state.getfav.isLoading = false;
                state.getfav.results = payload;
            })
            .addCase(getFavorites.rejected, (state, { payload }) => {
                state.getfav.isLoading = true;
            });

        builder
            .addCase(getCategoriesWithProducts.pending, (state) => {
                state.categoriesWithProducts.isLoading = true;
            })
            .addCase(
                getCategoriesWithProducts.fulfilled,
                (state, { payload }) => {
                    state.categoriesWithProducts.isLoading = false;
                    state.categoriesWithProducts.results = payload;
                }
            )
            .addCase(getCategoriesWithProducts.rejected, (state) => {
                state.categoriesWithProducts.isLoading = true;
            });
    },
});

export default productSlice.reducer;
