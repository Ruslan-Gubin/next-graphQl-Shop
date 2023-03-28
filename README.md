This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Next.js, TypeScript,

State - Redux toolkit

LocaleStorage - redux-persist

## Deploy on Vercel
https://online-shop-beta-seven.vercel.app


## Project structure:

apps /

       apollo global request/response apollo/client

       store/rootReducer store project, 

       styles/global styles

       types/global types

       api fetch request/response

_________________________________________________________

## entities

Product / 

         components / ProductCategory,ProdctDetails,ProductCardFavorites,ProductCardBasket,
         ProductCategoryHeard,ProductCategoryMobile,ProductDetailsMobile

         lib / assets, context, data, helpers, hooks, store, types

User /  

         components / UserCard,ProdctDetails,UserInfo,UserSettingsInfo

         lib / assets, context, data, helpers, hooks, store, types


Feedback / 

           components / FeedbackProductCard
           
__________________________________________________________________           

## features 


AdminNavHeader /

            components / AdminNavHeader
            
            lib / assets, context, data, helpers, hooks, store, types, tests
             
AdminNotification / 

            components / AdminNotification
            
            lib / assets, context, data, helpers, hooks, store, types, tests
            
AdminOrder / 

            components / AdminOrderCard, AdminOrderNoContent, AdminOrder
            
            lib / assets, context, data, helpers, hooks, store, types, tests  
            
AdminProductManagment / 

            components / AdminProductManagment, AdminProductManagmentFooter, AdminModal,
            AdminProductManagmentHeader, AdminProductManagmentMain, UpdateProductCard
            
            lib / assets, context, data, helpers, hooks, store, types, tests            
            
AdminQuestionsContent / 

            components / AdminQuestionsCard, AdminQuestionsContent, AdminQuestionsFooter,
            AdminQuestionsList, AdminQuestionsOptions, NoContentQuestion
            
            lib / assets, context, data, helpers, hooks, store, types, tests                

AdminStartPage / 

            components / AdminStartPage
            
            lib / assets, context, data, helpers, hooks, store, types, tests 

AdminUpdateProduct / 

            components / AdminUpdateProduct, AdminUpdateProductFooter, AdminUpdateProductHeader,
            AdminUpdateProductMain
            
            lib / assets, context, data, helpers, hooks, store, types, tests 

Basket / 

            components / Basket, BasketAside, BasketFooter, BasketFooterDelivery
            BasketList, BasketNoContent, DeliveryModal
            
            lib / assets, context, data, helpers, hooks, store, types, tests
            
CatalogPage / 

            components / CatalogPage, CatalogPageFooter, CatalogPageHeader, CatalogPageHeaderMobile
            CatalogProductList, PriceFilter
            
            lib / assets, context, data, helpers, hooks, store, types, tests            

CreatedProduct / 

            components / CreatedProduct, AditationInfo, BasicInfo, CreatedProductFooter
            CreatedProductHeader, CreatedProducts
            
            lib / assets, context, data, helpers, hooks, store, types, tests 
            
            
 FooterButtonHelpers / 

            components / FooterButtonHelpers
                      
LoginPage / 

            components / LoginForm, LoginPage, LoginPageInput, LoginPageInputPhone
            RegistationForm
            
            lib / assets, context, data, helpers, hooks, store, types, tests             
            
UserDetails / 

            components / UserDetails, UserDetailsButtons, userDetailsData, UserDetailsFavorites
            UserDetailsOrders
            
            lib / assets, context, data, helpers, hooks, store, types, tests           
            
UserFavorites / 

            components / UserFavorites, UserFavoritesNoContent
            
            lib / assets, context, data, helpers, hooks, store, types, tests             
            
UserOrders / 

            components / UserOrders, UserOrderCard, UserOrderNoContent
            
            lib / assets, context, data, helpers, hooks, store, types, tests
            
________________________________________________________________________________

## pages 

       _app, 404, index

admin / 

         add-warehouse, all-products, contact, created-product,ended-products, 
          notification, questions, statistics-products, update-product, index

basket / 

         index
            
brands/

         [brand]/index           
            
catalog/

        [name]index/[label]index/[id]index           

lk/

         details, favorites, myorders

security/

         login

services/

          dostavka

_____________________________________________________________________________________

## shared

components / 

             AccordionBird, AdminOptionButton, AdminTexteria, Array, BasketFooterCard, BurgerButton
             ButtonFooterHelper, CloseProductButton, CustomAdminInput, CustomClose, CustomLink, CustomPagination,
             DropDownCategory, DropDownMenu, Error, Heart, ImageSearch, ImagesProductDetails, LKHeader, Loader, 
             LoaderShop, Modal, ModalInput, NoContentAdmin, ProductDetailsButton, ProductDetailsSubInfo, ProductListImag,
             QueckMessage, RemoveIcon, SearchItemAutocomplete, Skeleton, StarsList, UserIconActive

lib / 

           assets, context, data, helpers, hooks, store, types, tests,  config, constant, styles,  utils

hooks/

          useAddImage, useAppDispatch, useDebounce, useHover, useInfinitiScroll, useQuickMessage 

________________________________________________________________________________________

## widgets

AdminLayout / 

             components / AdminLayout, AdminLayoutAside, AdminLayoutHeader

             lib / assets, context, data, helpers, hooks, store, types

BrandPage / 

              components / BrandPage, BrandPageHeader
              lib / assets, context, data, helpers, hooks, store, types

CatalogStartPage / 

            components / CatalogStartPage, CatalogSwiper, CatatlogProductList, CategoryCard
            
            lib / assets, context, data, helpers, hooks, store, types, tests
             
HomePage / 

            components / HomePage, HomePageBrandsList, HomePageCategoriList, HomePageFooter, HomePageSwiper
            
            lib / assets, context, data, helpers, hooks, store, types, tests             
             
ProductDetailsPage / 

            components / ProductDetailsPage, ProductDetailsHeader
            
            lib / assets, context, data, helpers, hooks, store, types, tests             
             
ProductFeedback / 

            components / FeedbackList, FeedbacModal, ProductFeedback, StarsOpinionFeedback
            
            lib / assets, context, data, helpers, hooks, store, types, tests              
             
ShopLayout / 

            components / AsideCatehoryItem, FooterCopyrights, FooterNavigation, FooterNavigationList,
            LayoutAutoComplet, LayoutHeaderSearch, LayoutSearchInput, LayoutSearchMobile, ShopHeaderLogo,
            ShopLayout, ShopLayoutAside, ShopLayoutHeader, ShopLayoutHeaderMobile, ShopLayoutNavMobile
            
            lib / assets, context, data, helpers, hooks, store, types, tests              
             
 SizeCardCatalog / 

            components / SizeCardCatalog
                       
             
___________________________________________________________________________________             
            


