# -*- coding: utf-8 -*-
"""
Created on Tue Jan 20 16:16:13 2026

@author: Emmanuelle YANKAM
"""

import json
import math
import argparse
import getpass
from algoliasearch.search.client import SearchClientSync

def read_json(json_path): 
    """
    Reads a json file.
    Args:
        json_path (str): The absolute path to the data.
    Returns:
        data (dict): The data extracted from the json file
    Raises:
        FileNotFoundError: If json_path does't exist.
        ValueError: Of json_path isn't a json file
   """
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data
    except FileNotFoundError:
        raise FileNotFoundError(json_path, " not found")
    except json.JSONDecodeError as e:
        raise ValueError("Invalid JSON") from e
        
        

def is_from_category(product, category):
    """
    Checks whether a product belongs to a specified category.
    Args:
     product (dict): The product to check.
     category (str): The category to check against.
    Returns:
     bool: True if the product belongs to the specified category, False otherwise.

   """
    product_categories = product["categories"]
    product_categories_str = ''.join(product_categories).lower()
    return category.lower() in product_categories_str
    
    
    
def split_by_category(data, category):
    """
    Separates products based on whether they belong to a specified category.
    
    
    Args:
    data (list of dict): A list of products to filter.
    category (str): The category used to filter products.
    
    
    Returns:
    tuple: A tuple containing two lists:
    - List of products that belong to the specified category.
    - List of products that belong to other categories.
    """
    products_from_category = []
    products_other_category = []
    for product in data:
        if  is_from_category(product, category):
            products_from_category.append(product)
        else:
            products_other_category.append(product)
    
    return products_from_category, products_other_category

def compute_new_price(products_from_category, discount_factor):
    """
    Updates the price of each product by applying a discount factor.
    
    
    Args:
    products (list of dict): A list of products whose prices will be updated.
    discount_factor (float): The fraction by which to reduce the price (e.g., 0.2 for a 20% discount).
    
    
    Returns:
    list of dict: The same list of products with updated prices, rounded down to the nearest integer.
    """
    for product in products_from_category:
        current_price = product["price"]
        new_price = current_price - current_price*discount_factor
        product["price"] = math.floor(new_price)
        
    return products_from_category

def create_new_catalog(products_from_category, products_other_category, discount_factor):
    """
    Creates a new catalog by applying a discount to products from a specific category
    and combining them with the other products.
    
    
    Args:
    products_from_category (list of dict): Products to which the discount will be applied.
    products_other_category (list of dict): Products that remain at their original price.
    discount_factor (float): Fraction by which to reduce the price of discounted products
    (e.g., 0.2 for a 20% discount).
    
    
    Returns:
    list of dict: A combined list of products including discounted and non-discounted items.
    """
    
    products_on_sale = compute_new_price(products_from_category, discount_factor)
    
    return products_other_category + products_on_sale

def restricted_float(x):
    """
    Converts a string input to a float and ensures it is between 0 and 1.

    Args:
        x (str or float): The input value to be converted and validated.

    Returns:
        float: The validated float value if it is within the range [0.0, 1.0].

    Raises:
        argparse.ArgumentTypeError: If the input cannot be converted to float 
                                    or is not within the range [0.0, 1.0].
    """
    try:
        x = float(x)
    except ValueError:
        raise argparse.ArgumentTypeError(f"'{x}' is not a valid float")
    
    if x < 0.0 or x > 1.0:
        raise argparse.ArgumentTypeError(f"{x} is not in the range [0.0, 1.0]")
    
    return x

if __name__ == "__main__":
    
    # Create parser
    parser = argparse.ArgumentParser(description="Data transformation script")
    parser.add_argument("--file_path", required=True, type=str, help="The path to the products json file")
    parser.add_argument("--index_name", required=False, type=str, default = "products_on_sale", help="Algolia index in which the data will be stored.")
    parser.add_argument("--category", required=False,type=str, default="camera", help="The target product category for the discount.")
    parser.add_argument("--discount_factor", required=False, type=restricted_float,  default=0.2, help="Discount factor as a float between 0 and 1 (e.g., 0.2 for 20%)")
    
    # Parse known args
    args = parser.parse_args()
    file_path = args.file_path
    index_name = args.index_name
    category = args.category
    discount_factor = args.discount_factor
    
    # Prompt for application ID & API Key securely
    app_id = getpass.getpass("Enter your application ID: ")
    api_key = getpass.getpass("Enter your API Key: ")
    

    #  start the data transformation chain
    data =  read_json(file_path)
    products_from_category, products_other_category = split_by_category(data, category)
    new_catalog = create_new_catalog(products_from_category, products_other_category, discount_factor)
    
    # Connect and authenticate with your Algolia app using your app ID and write API key
    _client = SearchClientSync(app_id, api_key)


    # Save records in Algolia index
    _client.save_objects(
    index_name=index_name,
    objects=new_catalog,
    )
    
    #Success message

    print("Data has been successfully saved in the Algolia index 'products_on_sale'.")

