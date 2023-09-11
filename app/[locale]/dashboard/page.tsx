import PageWrapper from "@/components/layout/page-wrapper";
import Dashboard from "@/components/modules/dashboard";
// import { getPlaces } from "@/helpers/getPlaces";
import { IPlace } from "@/types";

// const getPlaces = async () => {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_SITE_URL}/api/place`,
//       {
//         method: "GET",
//         cache: "no-store",
//       }
//     );

//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     } else {
//       console.error("Error fetching data from the API");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

const page = () => {
  return (
    <PageWrapper>
      <Dashboard />
    </PageWrapper>
  );
};

export default page;
