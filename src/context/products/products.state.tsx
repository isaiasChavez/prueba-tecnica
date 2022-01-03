import { AxiosResponse } from "axios";
import { validateOrReject } from "class-validator";
import { useReducer, useState } from "react";
import axios from "../../config/axios";
import { HTTPResponses, ServerResponse, URLS } from "../../types";
import ErrorService from "../../utils/error.helper";
import ProductsContext, { initialStateProducts } from "./products.context";
import { CreateProductDTO } from "./products.dto";
import ProductsReducer from "./products.reducer";
import { PRODUCTS_ACTIONS } from "./productstypes";

const ProductsState = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, initialStateProducts());
  const [loading, setLoading] = useState(true);

  const getCategories = async (): Promise<ServerResponse> => {
    try {
      setLoading(true);
      const res: AxiosResponse = await axios.get(`${URLS.product.categories}`);
      const data: ServerResponse = res.data;

      dispatch({
        type: PRODUCTS_ACTIONS.GET_CATEGORIES,
        payload: data.data,
      });
      setLoading(false);
      return {
        msg: "ok",
        status: HTTPResponses.Ok,
        data: data.data,
      };
    } catch (error) {
      setLoading(false);
      return {
        status: HTTPResponses.BadRequest,
        msg: errorService.genericHandler("getCategories", error),
      };
    }
  };
  const getStatusesProduct = async (): Promise<ServerResponse> => {
    try {
      setLoading(true);
      const res: AxiosResponse = await axios.get(`${URLS.product.statuses}`);
      const data: ServerResponse = res.data;

      dispatch({
        type: PRODUCTS_ACTIONS.GET_STATUSES,
        payload: data.data,
      });
      setLoading(false);
      return {
        msg: "ok",
        status: HTTPResponses.Ok,
        data: data.data,
      };
    } catch (error) {
      setLoading(false);
      return {
        status: HTTPResponses.BadRequest,
        msg: errorService.genericHandler("getCategories", error),
      };
    }
  };

  const create = async (dto: CreateProductDTO): Promise<ServerResponse> => {
    try {
      validateOrReject(dto);
      setLoading(true);

      const res: AxiosResponse = await axios.post(`${URLS.product.create}`);
      const data: ServerResponse = res.data;
      setLoading(false);

      if (data.status === HTTPResponses.Ok) {
        dispatch({
          type: PRODUCTS_ACTIONS.CREATE_PRODUCT,
          payload: null,
        });
        return {
          msg: "ok",
          status: HTTPResponses.Ok,
          data: data.data,
        };
      }
      return data;
    } catch (error) {
      setLoading(false);
      return {
        status: HTTPResponses.BadRequest,
        msg: errorService.genericHandler("getCategories", error),
      };
    }
  };
  const getPublicationsUser = async (): Promise<ServerResponse> => {
    try {
      setLoading(true);

      const res: AxiosResponse = await axios.get(`${URLS.product.user}`);
      const data: ServerResponse = res.data;

      setLoading(false);

      if (data.status === HTTPResponses.Ok) {
        dispatch({
          type: PRODUCTS_ACTIONS.GET_PUBLICATIONS_USER,
          payload: {
            publications: data.data,
          },
        });
      }
      if (data.status === HTTPResponses.OkNoContent) {
        //No tiene publicaciones
      }
      return data;
    } catch (error) {
      setLoading(false);
      return {
        status: HTTPResponses.BadRequest,
        msg: errorService.genericHandler("getCategories", error),
      };
    }
  };

  const getPublicationData = async (uuid: string): Promise<ServerResponse> => {
    try {
      setLoading(true);
      const url = `${URLS.product.onepublication}/${uuid}`;
      console.log({ url });
      const res: AxiosResponse = await axios.get(url);

      const data: ServerResponse = res.data;
      console.log({ data });
      setLoading(false);

      if (data.status === HTTPResponses.Ok) {
        dispatch({
          type: PRODUCTS_ACTIONS.GET_PUBLICATION_DATA,
          payload: {
            publication: data.data,
          },
        });
      }
      if (data.status === HTTPResponses.OkNoContent) {
        //No tiene publicacion
      }
      return data;
    } catch (error) {
      setLoading(false);
      return {
        status: HTTPResponses.BadRequest,
        msg: errorService.genericHandler("getCategories", error),
      };
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        loading,
        getCategories,
        getPublicationsUser,
        getStatusesProduct,
        create,
        getPublicationData,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const errorService = new ErrorService(ProductsState);

export default ProductsState;
