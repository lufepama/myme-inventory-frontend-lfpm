# myme-inventory-frontend-lfpm

The project is built using Vite (https://vitejs.dev/).

Steps to run the web locally: 
  1. npm install 
  2. npm install vite
  3. npm run dev

The routes of the application are protected using a Higher Order Component. To start using the app, it is necessary to register and log in.

Below, specific functionalities are outlined.

1. Collapsible sidebar.
2. The products that will be used to fill the stores must be created on the products page by clicking on the 'Add product' button.

![Create product](https://user-images.githubusercontent.com/72669633/216874910-866bef54-8921-4206-9bac-7315b3683a4a.png)

3. Upon creating a product, it will be listed.

![productos lista](https://user-images.githubusercontent.com/72669633/216875125-44d59fc4-94dc-4922-be0b-6c8f72bdc5d8.png)

4. To delete a product, click on the 'trash' icon. A modal will open.

![del-producto](https://user-images.githubusercontent.com/72669633/216875369-5716dd7e-230c-41ca-be83-f048311448fd.png)

5. We can also create new stores and view the list of existing ones. Each store can be deleted, just like the products

![image](https://user-images.githubusercontent.com/72669633/216876381-975e666f-df11-4d57-a098-bbd038e36593.png)

6. Multiple products can be added and removed from stores. To do this, it is necessary to select them and click on 'Add product' or 'Delete product'.
A modal will open where the product can be found based on its name. The 'Delete' and 'Add' buttons will become active when a product is selected.
If the product is already in the warehouse, its quantity will be updated according to the new amount value.

![image](https://user-images.githubusercontent.com/72669633/216876632-3b731073-fd5b-4962-8912-ead705205eb7.png)

7. The products of each store can be accessed by clicking on the item in the previous list. This will take us to a page where we will find the general information of the store and then the list of products.

![detail warehouse](https://user-images.githubusercontent.com/72669633/216876928-253923f9-abd1-4a6a-b5a5-2777bd2186fa.png)

8. Products can be deleted as in previous cases. The quantity of the products can be modified by clicking on the 'pen' icon.

![update quantity](https://user-images.githubusercontent.com/72669633/216877208-544fd1b0-ea52-4946-98e6-89a50d8c97f8.png)

9. To log out, click on the last item in the sidebar. I will take you to login page.
