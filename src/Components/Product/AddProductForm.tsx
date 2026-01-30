import React, { useRef, useState } from 'react'
import {useForm} from 'react-hook-form'
import { array, set, string } from 'zod';
import { da, ur } from 'zod/locales';

import { productValidationSchema, attributesSchema, optionsSchema, type ProductValidationSchema, type AttributesSchema, type OptionsSchema } from '../../Schema/productValidation';

import Modal from '../Modal/Modal';

import { useContextModal } from '../../Context-API/ContextModal';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAddProduct } from '../../hook/reactQuearyFetchProduct';
import { url } from 'inspector';


const AddProductForm = () => {

    const { addProduct} = useAddProduct();

    const { openModal, isOpen, closeModal } = useContextModal();

    const [optionList, setOptionList] = useState<string[]>([]);
    const [attributeList, setAttributeList] = useState<{ [key: string]: string }>({});
    const [urlValid, setUrlValid] = useState(true);
    const [urlArray, setUrlArray] = useState<string[]>([]);

    const atributes = useForm<AttributesSchema>({ resolver: zodResolver(attributesSchema) });
    const option = useForm<OptionsSchema>({ resolver: zodResolver(optionsSchema) });
    const { register, handleSubmit, watch, formState: { errors }, reset, resetField } = useForm<ProductValidationSchema>({resolver:zodResolver(productValidationSchema)});
    const values = watch();

    //attribute Form handlers
    const atributesHandler = (data: any) => {
        setAttributeList({...attributeList, [data.title]: data.value});
        reset({...values, atributes: {title:[data.title], value: data.value}});
    } 

    //option Form handlers
    const optionHandler = (data: any) => {
        reset({...values, options: {title: data.title, value: optionList}});
    }

    const handleJoinOptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setOptionList([...optionList, option.getValues("value") as string]);
    }

    const handleOptionClick = (opt: string) => {
        setOptionList(optionList.filter(o => o !== opt));
    }

    const handleAddImageUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const imageUrl = values.imageUrl[0];
            const url = new URL(imageUrl);
            if(urlArray.includes(imageUrl)) throw new Error("URL already exists");
            if (!imageUrl) throw new Error("Invalid image URL");
            setUrlArray([...urlArray, imageUrl]);
            resetField("imageUrl", { defaultValue: [""] });
        } catch (error: any) {
            console.error("Invalid URL: " + error.message);
            return
        }
    }

    const handleRemoveImageUrl = (i) => {
        setUrlArray(urlArray.filter((_, index) => index !== i));
    }

    const onSubmit = async (data) => { 
        try {
            console.log(data);
            addProduct({...data, imageUrl: urlArray, attributes: attributeList, options: {title: option.getValues("title"), value: optionList}});
            //reset();
            //setAttributeList({});
            //setOptionList([]);
            //alert('Product added successfully!');
            // Optionally close the form or modal here
            // Proceed with further processing, e.g., sending data to an API
        } catch (e) {
            if (e) {
                console.error('Validation Errors:', e.errors);
            } else {
                console.error('Unexpected Error:', e);
            }
        }
    }

    const handleProductSubmit = () => {
        handleSubmit(onSubmit)()
    }

  return (
    <div>
        <Modal isOpen={isOpen} onClose={closeModal}>
            <ul className="list bg-base-100 rounded-box shadow-md">

            <li className="p-4 pb-2 text-xs  max-w-full opacity-60 tracking-wide">Attributes</li>
            {
                Object.entries(attributeList).map(([key, value]) => (
                    <li key={key} className="list-row hover:bg-base-200">
                        <div><img className="size-10 rounded-box" src={urlArray[0]} /></div>
                        <div>
                        <div>{key}</div>
                        </div>
                        <p className="list-col-wrap text-xs">
                            {value}
                        </p>
                        <button className="btn btn-square btn-ghost">
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                        </button>
                        <button className="btn btn-square btn-ghost">
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                        </button>
                    </li>
                ))
            }
            </ul>
        </Modal>

        <div className='flex flex-row items-start justify-center mt-8'>
    
        <fieldset className="fieldset  border-base-300 rounded-box w-max h-auto border p-4">
          <legend className="fieldset-legend ">Product details</legend>
          <form>
            <fieldset id='add-product-form' className='fieldset border-base-300 rounded-box w-full border'>
                    <div>
                    <label className="label">Title</label>
                    <input {...register("title")} type="text" className="input file-input-sm" placeholder="title" />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>
                
 
                <div>
                    <label className="label">Brand</label>
                    <input {...register("brand")} type="text" className="input file-input-sm" placeholder="brand" />
                    {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
                </div>

                <div>
                    <label className="label">Description</label>
                    <input {...register("description")} type="text" className="input file-input-sm" placeholder="description" />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="label">Dimensions (W-H-D)"</label>
                    <input {...register("dimensions")} type="text" className="input file-input-sm" placeholder="Width x Height x Depth" />
                    {errors.dimensions && <p className="text-red-500 text-sm mt-1">{errors.dimensions.message}</p>}
                </div>

                <div>
                    <label className="label">Price</label>
                    <input {...register("price", { valueAsNumber: true })} type="number" className="input file-input-sm" placeholder="0"/>
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                </div>
                <div>
                    <label className="label">Status</label>
                    <div>
                            <select {...register("status")} className="select validator file-input-sm" required>
                                <option disabled selected value="">Choose:</option>
                                <option>Active</option>
                                <option>Draft</option>
                                <option>Archived</option>
                            </select>
                        <p className="validator-hint">Required</p>
                    </div>
                </div>
                
                <div>
                    <label className="label">Weight (lbs)</label>
                    <input {...register("weight", { valueAsNumber: true })} type="number" className="input file-input-sm" placeholder="0" />
                    {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
                </div>
                
                <div>
                    <label className="label">Stock Quantity</label>
                    <input {...register("stockQuantity", { valueAsNumber: true })} type="number" className="input file-input-sm" placeholder="0" />
                    {errors.stockQuantity && <p className="text-red-500 text-sm mt-1">{errors.stockQuantity.message}</p>}
                </div>

                <div>
                    <label className="label">Currency</label>
                    <select {...register("currency")} defaultValue="USD" className="select file-input-sm">
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>CNY</option>
                    </select>
                </div>
                </fieldset>
                <fieldset id="image-urls" className='fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mt-4'>
                <div className="flex flex-col items-start gap-2">
                    <label className="label">Image URL</label>
                    <div className="join">
                        <div>
                            <label className="input validator join-item file-input-sm">
                                <input {...register(`imageUrl.0`)} type="input" placeholder="http://images.com"/>
                            </label>
                        </div>
                        <button className="btn btn-neutral join-item file-input-sm" onClick={handleAddImageUrl}>Join</button>
                    </div>
                </div>
                <fieldset className='fieldset border bg-base-100 border-base-300 p-3 rounded-box mt-4'>
                    {
                            urlArray.length > 0 ? 
                                <div className='flex flex-row items-center mt-2'> 
                                    {
                                        urlArray.map((url, index) => {
                                            return(
                                                <div key={index} className="flex flex-wrap gap-3">
                                                    <img className={`w-16 h-16 rounded pr-2*${index}`} key={index} src={url} onError={(e) => e.currentTarget.src ='../public/vite.svg'} onClick={() => handleRemoveImageUrl(index)} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                
                            :
                                <svg className='w-16 h-16 text-green-300' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" fill="none">
                                    <path d="M12 22C11.1818 22 10.4002 21.6646 8.83693 20.9939C4.94564 19.3243 3 18.4895 3 17.0853L3 7.7475M12 22C12.8182 22 13.5998 21.6646 15.1631 20.9939C19.0544 19.3243 21 18.4895 21 17.0853V7.7475M12 22L12 12.1707M21 7.7475C21 8.35125 20.1984 8.7325 18.5953 9.495L15.6741 10.8844C13.8712 11.7419 12.9697 12.1707 12 12.1707M21 7.7475C21 7.14376 20.1984 6.7625 18.5953 6M3 7.7475C3 8.35125 3.80157 8.7325 5.40472 9.495L8.32592 10.8844C10.1288 11.7419 11.0303 12.1707 12 12.1707M3 7.7475C3 7.14376 3.80157 6.7625 5.40472 6M6.33203 13.311L8.32591 14.2594" stroke="currentColor">
                                    </path>
                                <path d="M12 2V4M16 3L14.5 5M8 3L9.5 5" stroke="currentColor">
                                </path>
                            </g>
                        </svg>
                        }
                    </fieldset>
                </fieldset>
            </form> 
            
          
                {/* Attributes Form */}
                <form onSubmit={atributes.handleSubmit(atributesHandler)} className='flex flex-col gap-4 mt-4'>
                    <fieldset id="attributes" className="fieldset border bg-base-200 border-base-300 p-3 rounded-box">
                    <legend className="fieldset-legend text-gray-400">Attributes</legend>
                        <div className='flex flex-col items-start gap-2'>
                            <label className="label">Title</label>
                            <input {...atributes.register("title")} type="text" className="input file-input-sm" placeholder="Title" />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>
                        <div className='flex flex-col items-start gap-2'>
                            <label className="label">Description</label>
                            <textarea {...atributes.register("value")} className="textarea" placeholder="Description"></textarea>
                            
                        </div>
                        <button className="btn btn-xs btn-outline btn-primary mt-4 w-1/4">Add Attribute</button>
                    </fieldset>
                </form>
                {/* Options Form */}
                <form onSubmit={option.handleSubmit(optionHandler)} className='flex flex-col gap-4 mt-4'>
                    <fieldset id="options" className="fieldset border bg-base-200 border-base-300 p-3 rounded-box">
                    <legend className="fieldset-legend text-gray-400">Option</legend>
                        <div >
                            <div className='flex flex-col items-start gap-2'>
                                <label className="label">Title</label>
                                <input {...option.register("title")} type="text" className="input file-input-sm" placeholder="Title" />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                            </div>
                            <div>
                                {
                                    optionList.length > 0 && optionList.map((opt, index) => (
                                        <div key={index} className="badge badge-outline m-1" onClick={() => handleOptionClick(opt)}>{opt}</div>
                                    ))
                                }
                            </div>
                            <div className="join mt-2 flex flex-col items-start gap-2">
                                <label className='label'>Values</label>
                                <div className='flex flex-row items-center'   >
                                    <div className='flex flex-col items-start gap-2'>
                                    
                                    <label className="input join-item file-input-sm">
                                        <input {...option.register("value")} type="input" placeholder="value"/>
                                    </label>
                                    </div>
                                    <button type="button" className="btn btn-neutral join-item file-input-sm" onClick={handleJoinOptionClick}>Join</button>  
                                </div>
                            </div>

                        </div>
                        <button className="btn btn-xs btn-outline btn-primary mt-4 w-1/4">Add Option</button>
                    </fieldset>
            </form>

        <button className="btn btn-primary mt-4 w-1/5" type='submit' onClick={handleProductSubmit}>Add Product</button>
    </fieldset>
    <fieldset className="fieldset  border-base-300 rounded-box w-max h-auto border p-4 ml-4">
        <legend className="fieldset-legend ">Product Preview</legend>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
            {/* head */}
            <thead>
            <tr>
                <th>Feature</th>
                <th>Value</th>
                <th>2 Value</th>
            </tr>
            </thead>
            <tbody>
                {Object.entries(values).map(([key, value]) => {
                    if(typeof value === 'object' && value !== null && !Array.isArray(value)) {
                            return (<tr className='cursor-pointer bg-base-300' onClick={() => openModal()} key={key}>
                                <td>{key}</td>
                                <td>{value?.title}</td>
                                <td>{typeof value.value !== 'string' ? value?.value.join(", ") : value?.value.split(' ')[0]+'...'}</td>
                            </tr>)
                        }
                    else {
                            return (<tr key={key}> 
                                <td>{key}</td>
                                {Array.isArray(value) ? <td>{'Urls'}</td> :
                                <td>{typeof value === 'string' ? value?.slice(0,20) + ' ...' : value}</td>}
                                <td>{}</td>
                            </tr>)
                    }
                    })
                    } 
            </tbody>
        </table>
    </div>
    </fieldset>
    </div>
    </div>
      
       
  )
}

export default AddProductForm
