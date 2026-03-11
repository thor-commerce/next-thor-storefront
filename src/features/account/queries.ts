import { gql } from "@/__generated__/thor";

export const ACCOUNT_DASHBOARD_QUERY = gql(/* GraphQL */ `
  query AccountDashboard {
    customer {
      id
      email
      firstName
      lastName
      ordersCount
      customerGroups(first: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
      defaultShippingAddress {
        id
        firstName
        lastName
        address1
        address2
        postalCode
        city
        state
        countryCode
      }
      defaultBillingAddress {
        id
        firstName
        lastName
        address1
        address2
        postalCode
        city
        state
        countryCode
      }
      addresses(first: 6) {
        totalCount
        edges {
          node {
            id
            name
            firstName
            lastName
            address1
            address2
            postalCode
            city
            state
            countryCode
          }
        }
      }
      orders(first: 5) {
        totalCount
        edges {
          node {
            id
            orderNumber
            createdAt
            orderState
            paymentState
            shipmentState
            lineItemsQuantity
            total {
              centAmount
              currencyCode
              fractionDigits
            }
          }
        }
      }
    }
  }
`);
