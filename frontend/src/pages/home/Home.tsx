import { useBarCharts } from "../../api/useBarCharts";
import { useDashboardCharts } from "../../api/useDashboardCharts";
import BarChartBox from "../../components/barChartBox/BarChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieCartBox/PieChartBox";
import TopBox from "../../components/topBox/TopBox";
import "./home.scss";

const Home = () => {
  const { data, isLoading, isError } = useDashboardCharts();
  const { data: barCharts } = useBarCharts();

  if (isLoading) return <p>Loading dashboard...</p>;
  if (isError) return <p>Failed to load dashboard</p>;

  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...data?.users} />
      </div>
      <div className="box box3">
        <ChartBox {...data?.products} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box5">
        <ChartBox {...data?.ratio} />
      </div>
      <div className="box box6">
        <ChartBox {...data?.revenue} />
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="box box8">
        <BarChartBox {...barCharts?.visit} />
      </div>
      <div className="box box9">
        <BarChartBox {...barCharts?.profit} />
      </div>
    </div>
  );
};

export default Home;
