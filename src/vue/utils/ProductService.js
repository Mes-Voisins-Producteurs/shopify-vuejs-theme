import axios from "axios";



class ProductService {
  constructor() {
    this.collectionsEndpoint = "products-endpoint";
    this.productEndpoint = "product-endpoint";
    this.productMiniEndpoint = "product-mini-endpoint";
  }

  /**
   * Fetch products of a collection with filtered tags
   *
   * @param {String}  handle collection handle
   * @param {Array} tags provided tags
   * @param {String} sortBy string
   * @param {Number} page
   * @returns {Array} array of products
   */
  async getAll({
    handle,
    tags,
    page,
    sortBy
  }) {
    if (!handle) handle = "all";
    if (!page) page = 1;

    // call the endpoint by axios
    let items = [];
    let info = {};
    try {
      tags = encodeURI(tags.join("+"));
      let {
        data
      } = await axios.get(`/collections/${handle}/${tags}?page=${page}&sort_by=${sortBy}&view=${this.collectionsEndpoint}`);

      // this is required for shopify customizer to work
      if (typeof data === "string") {
        data = data.replace("<!-- BEGIN template --><!-- collection.products-endpoint -->{", "{");
        data = data.replace("<!-- END template -->", "");
        data = JSON.parse(data);
      }

      items = data.products;
      info.productsCount = data.products_count;
    } catch (err) {
      console.error(err);
      return {};
    }

    return {
      items,
      info
    };
  }

  /**
   * Fetch products of a collection with filtered tags
   *
   * @param {String}  handle collection handle
   * @param {String} cursor
   * @param {Array} tags provided tags
   * @param {String} sortBy string
   * @returns {Array} array of products
   */
  async getAllGraphQL({
    handle,
    cursor,
    tags,
    sortBy
  }) {
    let query = `
    query {
      collectionByHandle(handle: "${handle}") {
        `

    if (cursor) {
      query += `
        products(first: 250, after: "${cursor}") {
        `

    } else {
      query += `
        products(first: 250) {
        `
    }

    query += `
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              availableForSale
              title
              id
              tags
              onlineStoreUrl
              totalInventory
              vendor
              images(first:10) {
                edges {
                  node {
                    altText
                    originalSrc
                    transformedSrc(maxWidth: 30, maxHeight: 30, crop: CENTER, preferredContentType: JPG)
                  }
                }
              }
              variants(first:10) {
                edges {
                  node {
                    sku
                    id
                    image {
                      altText
                      originalSrc
                      transformedSrc
                    }
                    quantityAvailable
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `;

    let url = "https://mes-voisins-producteurs2.myshopify.com/api/graphql"

    let data = await axios.post(url, query, {
      'headers': {
        'X-Shopify-Storefront-Access-Token': '072fcbed299df368c90ef06aa98dc0cc',
        'Content-Type': 'application/graphql',
      }
    })

    console.log(data)

    if (data.status != 200) {
      logger.error('problemos with the request ! ', data)
    }

    let products = data.data.data.collectionByHandle.products.edges
    let items = []

    products.forEach(element => {

      if (element.node.availableForSale) {
        items.push({
          'id': element.node.id,
          'title': element.node.title,
          'tags': element.node.tags,
          'url': element.node.onlineStoreUrl,
          'vendor': element.node.vendor,
          'totalInventory': element.node.totalInventory,
          'featured_image': element.node.images.edges[0].node.originalSrc,
          'placeholder_image': element.node.images.edges[0].node.transformedSrc,
          'alt_image': element.node.images.edges[0].node.altText,
        })
      }

    });

    let info = {
      'hasNextPage': data.data.data.collectionByHandle.products.pageInfo.hasNextPage
    }

    if (info.hasNextPage) {
      info.cursor = products[products.length - 1].cursor
    }

    return {
      items,
      info
    };




  }

  /**
   * Fetch the product from a custom liquid endpoint and
   * transform it
   *
   * @param {String} handle Shopify product handle
   */
  async getOne(handle) {
    // call the endpoint by axios
    let product = {};
    try {
      let {
        data
      } = await axios.get(`/products/${handle}?view=${this.productEndpoint}`);

      console.log(data)

      // this is required for shopify customizer to work
      if (typeof data === "string") {
        data = data.replace("<!-- BEGIN template --><!-- product.product-endpoint -->{", "{");
        data = data.replace("<!-- END template -->", "");
        data = JSON.parse(data);
      }

      product = data.product;
    } catch (err) {
      console.error(err);
      return [];
    }

    return product;
  }
  /**
   * Fetch the product from a custom liquid endpoint and
   * transform it
   *
   * @param {String} handle Shopify product handle
   */
  async getOneMini(handle) {
    // call the endpoint by axios
    let product = {};
    try {
      let {
        data
      } = await axios.get(`/products/${handle}?view=${this.productMiniEndpoint}`);

      // this is required for shopify customizer to work
      if (typeof data === "string") {
        data = data.replace("<!-- BEGIN template --><!-- product.product-mini-endpoint -->{", "{");
        data = data.replace("<!-- END template -->", "");
        data = JSON.parse(data);
      }

      product = data.product;
    } catch (err) {
      console.error(err);
      return [];
    }
    // transform the results
    return product;
  }

  /**
   * Fetch the product from a custom liquid endpoint and
   * transform it
   *
   * @param {String} handle Shopify product handle
   */
  async getOneVariant(handle, variant) {
    // call the endpoint by axios
    let ret_variant = {};
    try {
      let {
        data
      } = await axios.get(`/products/${handle}?variant=${variant}&view=${this.productMiniEndpoint}`);
      console.log(data)

      // this is required for shopify customizer to work
      if (typeof data === "string") {
        data = data.replace("<!-- BEGIN template --><!-- product.product-mini-endpoint -->{", "{");
        data = data.replace("<!-- END template -->", "");
        data = JSON.parse(data);
      }


      ret_variant = data.product;
    } catch (err) {
      console.error(err);
      return [];
    }
    // transform the results
    return ret_variant;
  }
}

export default new ProductService();
