

import { userMapToModelType } from "../../models/types/userType";

const normalizeEditUser = (user: userMapToModelType) => {
  return {
    name: { first: user.first, middle: user.middle!, last: user.last },
    phone: user.phone,
    email: user.email,
    password: user.password,
    image: {
      url: user.url,
      alt: user.alt,
    },
    address: {
      state: user.state!,
      country: user.country,
      city: user.city,
      street: user.street,
      houseNumber: +user.houseNumber,
      zip: +user.zip,
    },

    isBusiness: user.isBusiness,
    user_id: user.user_id,
    isAdmin: user.isAdmin,
  };
};

export default normalizeEditUser;
