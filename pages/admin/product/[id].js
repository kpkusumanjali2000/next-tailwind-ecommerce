import React, { useEffect, useReducer } from 'react';
import { Router, useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../../../utils/error';
import { useForm } from 'react-hook-form';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function AdminProductEditScreen() {
  const { query } = useRouter();
  const productId = query.id;
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('name', data.name);
        setValue('slug', data.slug);
        setValue('price', data.price);
        setValue('image', data.image);
        setValue('category', data.category);
        setValue('brand', data.brand);
        setValue('countInStock', data.countInStock);
        setValue('description', data.description);
      } catch (err) {
        dispatch({ type: 'FTECH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [productId, setValue]);

  const router = useRouter();

  const uploadHandler = async (e, imageField = 'image') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_}`;
  };

  const submitHandler = async ({
    name,
    slug,
    price,
    category,
    image,
    brand,
    countInStock,
    description,
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        category,
        image,
        brand,
        countInStock,
        description,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Product updated successfully');
      router.push('/admin/products');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={`Edit Product ${productId}`}>
      <div>
        <ul>
          <li>
            <Link href="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link legacyBehavior href="/admin/orders">
              Orders
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/admin/products">
              <a className="font-bold">Products</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/users">Users</Link>
          </li>
        </ul>
      </div>
      <div className="md:cols-span-3">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="mb-4 text-xl">{`Edit Product ${productId}`}</h1>
            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="w-full"
                id="name"
                autoFocus
                {...register('name', { required: 'Please enter name' })}
              />
              {errors.name && (
                <div className="text-red-500">{errors.name.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                className="w-full"
                id="slug"
                autoFocus
                {...register('slug', { required: 'Please enter slug' })}
              />
              {errors.slug && (
                <div className="text-red-500">{errors.slug.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="w-full"
                id="price"
                autoFocus
                {...register('price', { required: 'Please enter price' })}
              />
              {errors.price && (
                <div className="text-red-500">{errors.price.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                className="w-full"
                id="image"
                autoFocus
                {...register('image', { required: 'Please enter image' })}
              />
              {errors.image && (
                <div className="text-red-500">{errors.image.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                className="w-full"
                id="image"
                autoFocus
                {...register('image', { required: 'Please enter image' })}
              />
              {errors.image && (
                <div className="text-red-500">{errors.image.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="w-full"
                id="category"
                autoFocus
                {...register('category', { required: 'Please enter category' })}
              />
              {errors.category && (
                <div className="text-red-500">{errors.category.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                className="w-full"
                id="brand"
                autoFocus
                {...register('brand', { required: 'Please enter brand' })}
              />
              {errors.brand && (
                <div className="text-red-500">{errors.brand.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="countInStock">CountInStock</label>
              <input
                type="text"
                className="w-full"
                id="countInStock"
                autoFocus
                {...register('countInStock', {
                  required: 'Please enter countInStock',
                })}
              />
              {errors.countInStock && (
                <div className="text-red-500">
                  {errors.countInStock.message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="w-full"
                id="description"
                autoFocus
                {...register('description', {
                  required: 'Please enter description',
                })}
              />
              {errors.description && (
                <div className="text-red-500">{errors.description.message}</div>
              )}
            </div>
            <div className="mb-4">
              <button disabled={loadingUpdate} classname="primary-button">
                {loadingUpdate ? 'Loading' : 'Update'}
              </button>
            </div>
            <div className="mb-4">
              <Link href={`/admin/products`}>Back</Link>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}

AdminProductEditScreen.auth = { adminOnly: true };
