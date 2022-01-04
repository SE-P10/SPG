import { Button, Table, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import API from "../API";
import { BlockTitle, PageSection } from "../ui-components/Page";

function SeeStatistics(props) {
  const [statistics, setStatistics] = useState([]);
  const [filter, setFilter] = useState("month");
  const [isStatisticsLoading, setIsStatisticsLoading] = useState(true);

  useEffect(() => {

    const getUnretrievedProducts = async () => {
      let unretrievedProducts = await API.getUnretrievedProducts()
      setIsStatisticsLoading(false);
      let stat = API.getSatistics(unretrievedProducts, filter);
      setStatistics(stat);
      //base = week month
    };

    getUnretrievedProducts();
  }, [isStatisticsLoading, filter]);

  return (
    <PageSection>
      <BlockTitle>Statistics</BlockTitle>

      {isStatisticsLoading ? (
        <Spinner animation='border' variant='success' size='sm'></Spinner>
      ) : (
        <>
          {statistics.length ? (
            <>
              <Button
                className='below im-button im-animate'
                onClick={() => { setIsStatisticsLoading(true); setFilter("week"); }}>
                Weekly
              </Button>
              
              <Button
                className='below im-button im-animate'
                onClick={() => { setIsStatisticsLoading(true); setFilter("month") }}>
                Monthly
              </Button>
              <Table responsive size='sm'>
                <thead>
                  <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Farmer</th>
                    <th>{filter}</th>
                    <th>Year</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {statistics.map((d, index) => (
                    <tr key={index}>
                      <td></td>
                      <td>{d.name}</td>
                      <td>{d.quantity}</td>
                      <td>{d.farmer}</td>
                      {filter === "week" ? <td>{d.week}</td> : <td>{d.month}</td>}
                      <td>{d.year}</td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <> No Statistics</>
          )}
        </>
      )}
    </PageSection>
  );
}
export { SeeStatistics };
