//import { Role } from 'src/app/theme/shared/_helpers/role';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

export const NavigationItems: NavigationItem[] = [
 
  {
    id: 'admin',
    title: 'Order Management System ',
    type: 'group',
    icon: 'icon-navigation',
    //role: [Role.Admin, Role.User],
    children: [
    
          {
            id: 'user',
            title: 'User Management',
            icon: 'ti ti-user-check',
            type: 'collapse',
          // role: [Role.Admin, Role.User],
            children: [
              {
                id: 'list',
                title: 'List',
                icon: 'ti ti-list',
                type: 'item',
                url: '/user/list'
              },
              {
                id: 'add',
                title: 'Add',
                icon: 'ti ti-user-plus',
                type: 'item',
                url: '/user/add',
               //role: [Role.Admin,Role.User],
              }
            ]
          },
          {
            id: 'customer',
            title: 'Customer Management',
            icon: 'ti ti-users',
            type: 'collapse',
            //role: [Role.Admin, Role.User],
            children: [
              {
                id: 'list',
                title: 'List',
                icon: 'ti ti-list',
                type: 'item',
                url: '/customer/list'
              },
              {
                id: 'add',
                title: 'Add',
                type: 'item',
                url: '/customer/add',
                icon: 'ti ti-user-plus',
               // role: [Role.Admin]
              }
            ]
          },
          {
            id: 'product',
            title: 'Product Managemenet',
            icon: 'ti ti-shirt',
            type: 'collapse',
            //role: [Role.Admin, Role.User],
            children: [
              {
                id: 'view',
                title: 'View',
                icon: 'ti ti-search',
                type: 'item',
                url: '/product/view'
              },
              {
                id: 'add',
                title: 'Add',
                icon: 'ti ti-plus',
                type: 'item',
                url: '/product/add',
                //role: [Role.Admin]
              },

              {
                id: 'product-list',
                icon: 'ti ti-list',
                title: 'List',
                type: 'item',
                url: '/product/list'
              },
              
            ]
          }, 
          {
            id: 'order',
            title: 'Order Managemenet',
            type: 'collapse',
            icon: 'ti ti-basket',
           // role: [Role.Admin, Role.User],
            children: [
             
              {
                id: 'add',
                icon: 'ti ti-plus',
                title: 'Add',
                type: 'item',
                url: '/order/add',
                //role: [Role.Admin]
              },
              {
                id: 'order-list',
                icon: 'ti ti-list',
                title: 'List',
                type: 'item',
                url: '/order/orderList'
              },
              {
                id: 'create-invoice',
                title: 'Create Invoice',
                icon: 'ti ti-file-invoice',
                type: 'item',
                url: '/customer/createInvoice',
                //role: [Role.Admin]
              },
            ]
          }, 
          {
            id: 'warehouse',
            icon: 'ti ti-box',
            title: 'Warehouse Management',
            type: 'item',
            url: '/helpdesk/warehouse'
          },
 
    ]
  },
  {
    id: 'table',
    title: 'Error Management System',
    type: 'group',
    icon: 'ti ti-clipboard-check',
   // role: [Role.Admin, Role.User],
    children: [
      {
        id: 'error-form',
        title: 'Error Form',
        type: 'item',
        classes: 'nav-item',
        url: '/error-form',
        icon: 'ti ti-clipboard-check'
      },
      {
        id: 'error-list',
        title: 'Error Report',
        type: 'item',
        classes: 'nav-item',
        url: '/error-list',
        icon: 'ti ti-list'
      },
      //{
       // id: 'error-report',
       // title: 'Error Report',
        //type: 'item',
        //classes: 'nav-item',
        //url: '/error-report',
        //icon: 'ti ti-list'
      //},
     
    ]
  },
  {
    id: 'application',
    title: 'Application',
    type: 'group',
    icon: 'icon-navigation',
    //role: [Role.Admin, Role.User],
    children: [
      
      {
        id: 'customer',
        title: 'Customer',
        type: 'collapse',
        icon: 'ti ti-basket',
      //  role: [Role.Admin, Role.User],
        children: [
          {
            id: 'customer-list',
            title: 'Customer-List',
            type: 'item',
            url: '/customer/customerList'
          },
          {
            id: 'order-list',
            title: 'Order-List',
            type: 'item',
            url: '/customer/orderList'
          },
          {
            id: 'create-invoice',
            title: 'Create Invoice',
            type: 'item',
            url: '/customer/createInvoice',
          //  role: [Role.Admin]
          },
          {
            id: 'order-details',
            title: 'Order Details',
            type: 'item',
            url: '/customer/orderDetails'
          },
          {
            id: 'products',
            title: 'Products',
            type: 'item',
            url: '/customer/products'
          },
          {
            id: 'productReview',
            title: 'Products Review',
            type: 'item',
            url: '/customer/productReview'
          }
        ]
      },
      
      {
        id: 'ecommerce',
        title: 'Ecommerce',
        type: 'collapse',
        icon: 'ti ti-basket',
       //role: [Role.Admin, Role.User],
        children: [
          {
            id: 'product',
            title: 'Product',
            type: 'item',
            url: '/ec/ec-product'
          },
          {
            id: 'product-detail',
            title: 'Product-Detail',
            type: 'item',
            url: '/ec/ec-product-detail'
          },
          {
            id: 'product-list',
            title: 'Product-List',
            type: 'item',
            url: '/ec/ec-product-list'
          },
         
        ]
      },
      {
        id: 'Online-Courses',
        title: 'Online Courses',
        type: 'collapse',
        icon: 'ti ti-book',
        isMainParent: true,
        //role: [Role.Admin, Role.User],
        children: [
          {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/online-course/dashboard',
          //  role: [Role.Admin]
          },
          {
            id: 'teacher',
            title: 'Teacher',
            type: 'collapse',
           // role: [Role.Admin, Role.User],
            children: [
              {
                id: 'list',
                title: 'List',
                type: 'item',
                url: '/online-course/teacher/list'
              },
              {
                id: 'apply',
                title: 'Apply',
                type: 'item',
                url: '/online-course/teacher/apply'
              },
              {
                id: 'add',
                title: 'Add',
                type: 'item',
                url: '/online-course/teacher/add',
               // role: [Role.Admin]
              }
            ]
          },
          {
            id: 'student',
            title: 'Student',
            //role: [Role.Admin, Role.User],
            type: 'collapse',
            children: [
              {
                id: 'list',
                title: 'List',
                type: 'item',
                url: '/online-course/student/list'
              },
              {
                id: 'apply',
                title: 'Apply',
                type: 'item',
                url: '/online-course/student/apply'
              },
              {
                id: 'add',
                title: 'Add',
                type: 'item',
                url: '/online-course/student/add',
               // role: [Role.Admin]
              }
            ]
          },
          {
            id: 'courses',
            title: 'Courses',
            type: 'collapse',
           // role: [Role.Admin, Role.User],
            children: [
              {
                id: 'view',
                title: 'View',
                type: 'item',
                url: '/online-course/courses/view'
              },
              {
                id: 'add',
                title: 'Add',
                type: 'item',
                url: '/online-course/courses/add',
               // role: [Role.Admin]
              }
            ]
          }, 
        ]
      },
      {
        id: 'helpdesk',
        title: 'Helpdesk',
        type: 'collapse',
        icon: 'ti ti-help',
        isMainParent: true,
       // role: [Role.Admin, Role.User],
        children: [
        
          {
            id: 'customer',
            title: 'Customer',
            type: 'item',
            url: '/helpdesk/customer'
          },
          {
            id: 'warehouse',
            title: 'Warehouse Man.',
            type: 'item',
            url: '/helpdesk/warehouse'
          }
        ]
      },
    ]
  },
  {
    id: 'table',
    title: 'Tables',
    type: 'group',
    icon: 'ti ti-clipboard-check',
    //role: [Role.Admin, Role.User],
    children: [
      
      {
        id: 'tbl-dataTable',
        title: 'Data Table',
        type: 'item',
        classes: 'nav-item',
        url: '/dataTables',
        icon: 'ti ti-clipboard-check'
      },
    ]
  },
  {
    id: 'element',
    title: 'Element',
    type: 'group',
    icon: 'icon-navigation',
    //role: [Role.Admin, Role.User],
    children: [
      
      {
        id: 'basic',
        title: 'Basic',
        type: 'collapse',
        icon: 'ti ti-apps',
        classes: 'menu-scroll',
       // role: [Role.Admin, Role.User],
        children: [
          
          {
            id: 'button',
            title: 'Button',
            type: 'item',
            url: '/basic/button'
          },
          {
            id: 'badges',
            title: 'Badges',
            type: 'item',
            url: '/basic/badges'
          },
          {
            id: 'cards',
            title: 'Cards',
            type: 'item',
            url: '/basic/cards'
          },
          {
            id: 'collapse',
            title: 'Collapse',
            type: 'item',
            url: '/basic/collapse'
          },
          {
            id: 'carousel',
            title: 'Carousel',
            type: 'item',
            url: '/basic/carousel'
          },
          {
            id: 'dropdowns',
            title: 'Dropdowns',
            type: 'item',
            url: '/basic/dropdowns'
          },
          {
            id: 'offcanvas',
            title: 'Offcanvas',
            type: 'item',
            url: '/basic/offcanvas'
          },
          {
            id: 'modal',
            title: 'Modal',
            type: 'item',
            url: '/basic/modal'
          },
          {
            id: 'spinner',
            title: 'Spinner',
            type: 'item',
            url: '/basic/spinner'
          },
          {
            id: 'tabs-pills',
            title: 'Tabs & pills',
            type: 'item',
            url: '/basic/tabs-pills'
          },
          {
            id: 'toasts',
            title: 'Toasts',
            type: 'item',
            url: '/basic/toasts'
          },
          {
            id: 'other',
            title: 'Other',
            type: 'item',
            url: '/basic/other'
          }
        ]
      },
      {
        id: 'advance',
        title: 'Advance',
        type: 'collapse',
        icon: 'ti ti-briefcase',
        //role: [Role.Admin, Role.User],
        children: [
          {
            id: 'sweetAlert',
            title: 'Sweet Alert',
            type: 'item',
            url: '/advance/sweetAlert'
          },
          
          {
            id: 'lightbox',
            title: 'Lightbox',
            type: 'item',
            url: '/advance/lightbox'
          },
          {
            id: 'modal',
            title: 'Modal',
            type: 'item',
            url: '/advance/modal'
          },
          {
            id: 'notification',
            title: 'Notification',
            type: 'item',
            url: '/advance/notification'
          },
        ]
      },
      {
        id: 'icons',
        title: 'Icons',
        type: 'collapse',
        icon: 'ti ti-plant-2',
        //role: [Role.Admin, Role.User],
        children: [
          {
            id: 'Table',
            title: 'Tabler',
            type: 'item',
            url: 'https://tabler-icons.io/',
            target: true,
            external: true
          }
        ]
      }
    ]
  },
 
  {
    id: 'form',
    title: 'Forms',
    type: 'group',
    icon: 'icon-navigation',
    //role: [Role.Admin, Role.User],
    children: [
      {
        id: 'form-elements',
        title: 'Form Elements',
        type: 'collapse',
        icon: 'ti ti-forms',
       // role: [Role.Admin, Role.User],
        children: [
          
          {
            id: 'form-options',
            title: 'Form Options',
            type: 'item',
            url: '/forms/options'
          },
          
        ]
      },
      {
        id: 'form-plugin',
        title: 'Form Plugins',
        type: 'collapse',
        icon: 'ti ti-plug',
       // role: [Role.Admin, Role.User],
        children: [
          
          {
            id: 'input-select',
            title: 'Input Select',
            type: 'item',
            url: '/fPlugin/input-select'
          },
          
        ]
      },
      {
        id: 'form-validation',
        title: 'Form Validation',
        type: 'item',
        classes: 'nav-item',
        url: '/form-validation',
        icon: 'ti ti-clipboard-check'
      },
      {
        id: 'form-layout',
        title: 'Form Layouts',
        type: 'collapse',
        icon: 'ti ti-layout',
       // role: [Role.Admin, Role.User],
        children: [
          
          {
            id: 'frm-actionBars',
            title: 'ActionBars',
            type: 'item',
            url: '/form-layout/actionBars'
          },
        ]
      },
    ]
  },
  
  {
    id: 'pages',
    title: 'pages',
    type: 'group',
    icon: 'icon-navigation',
    //role: [Role.Admin, Role.User],
    children: [
      {
        id: 'authentication',
        title: 'Authentication',
        type: 'collapse',
        icon: 'ti ti-key',
       // role: [Role.Admin, Role.User],
        children: [
         
          {
            id: 'authenticationsV3',
            title: 'Authentication 3',
            type: 'collapse',
           // role: [Role.Admin, Role.User],
            children: [
              {
                id: 'v3-login',
                title: 'Login',
                type: 'item',
                url: '/auth/auth3/login',
                target: true,
                breadcrumbs: false
              },
              {
                id: 'v3-register',
                title: 'Register',
                type: 'item',
                url: '/auth/auth3/register',
                target: true,
                breadcrumbs: false
              },
              {
                id: 'v3-forgetPassword',
                title: 'Forget Password',
                type: 'item',
                url: '/auth/auth3/forgetPassword',
                target: true,
                breadcrumbs: false
              },
              {
                id: 'v3-checkMail',
                title: 'Check Mail',
                type: 'item',
                url: '/auth/auth3/checkMail',
                target: true,
                breadcrumbs: false
              },
              {
                id: 'v3-resetpassword',
                title: 'Reset Password',
                type: 'item',
                url: '/auth/auth3/resetpassword',
                target: true,
                breadcrumbs: false
              },
              {
                id: 'v3-codeVerification',
                title: 'Code Verification',
                type: 'item',
                url: '/auth/auth3/codeVerification',
                target: true,
                breadcrumbs: false
              }
            ]
          }
        ]
      },
    
      {
        id: 'maintenance',
        title: 'Maintenance',
        type: 'collapse',
        icon: 'ti ti-bug',
        children: [
          {
            id: 'error',
            title: 'Error 404',
            type: 'item',
            url: '/maintenance/error404',
            target: true,
            breadcrumbs: false
          },
          
        ]
      },
    ]
  },
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
   // role: [Role.Admin, Role.User],
    children: [
      {
        id: 'menu-level',
        title: 'Menu levels',
        type: 'collapse',
        icon: 'ti ti-menu',
      //  role: [Role.Admin, Role.User],
        children: [
          {
            id: 'menu-level-2.1',
            title: 'Level 2.1',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'menu-level-2.2',
            title: 'Level 2.2',
            type: 'collapse',
            classes: 'edge',
           // role: [Role.Admin, Role.User],
            children: [
              {
                id: 'menu-level-3.1',
                title: 'Level 3.1',
                type: 'item',
                url: 'javascript:',
                external: true
              },
              {
                id: 'menu-level-3.2',
                title: 'Level 3.2',
                type: 'item',
                url: 'javascript:',
                external: true
              },
              {
                id: 'menu-level-3.3',
                title: 'Level 3.3',
                type: 'collapse',
                classes: 'edge',
               // role: [Role.Admin, Role.User],
                children: [
                  {
                    id: 'menu-level-4.1',
                    title: 'Level 4.1',
                    type: 'item',
                    url: 'javascript:',
                    external: true
                  },
                  {
                    id: 'menu-level-4.2',
                    title: 'Level 4.2',
                    type: 'item',
                    url: 'javascript:',
                    external: true
                  }
                ]
              }
            ]
          },
          {
            id: 'menu-level-2.3',
            title: 'Level 2.3',
            type: 'collapse',
            classes: 'edge',
           // role: [Role.Admin, Role.User],
            children: [
              {
                id: 'menu-level-3.1',
                title: 'Level 3.1',
                type: 'item',
                url: 'javascript:',
                external: true
              },
              {
                id: 'menu-level-3.2',
                title: 'Level 3.2',
                type: 'item',
                url: 'javascript:',
                external: true
              },
              {
                id: 'menu-level-3.3',
                title: 'Level 3.3',
                type: 'collapse',
                classes: 'edge',
              //  role: [Role.Admin, Role.User],
                children: [
                  {
                    id: 'menu-level-4.1',
                    title: 'Level 4.1',
                    type: 'item',
                    url: 'javascript:',
                    external: true
                  },
                  {
                    id: 'menu-level-4.2',
                    title: 'Level 4.2',
                    type: 'item',
                    url: 'javascript:',
                    external: true
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'samplePage',
        title: 'Sample Page',
        type: 'item',
        classes: 'nav-item',
        url: '/samplePage',
        icon: 'ti ti-brand-chrome'
      },
      {
        id: 'document',
        title: 'Document',
        type: 'item',
        classes: 'nav-item',
        url: 'https://codedthemes.gitbook.io/berry-angular/',
        icon: 'ti ti-vocabulary',
        target: true,
        external: true
      }
    ]
  }
];
