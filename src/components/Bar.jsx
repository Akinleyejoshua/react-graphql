import { AiOutlineLink } from "react-icons/ai";

export const Bar = ({ data }) => {
  const arr = data.map((item, i) => {
    // console.log(item);
    return <>
      <div className="date">{item.launch_date_local.split("T")[0]}</div>
      <div className="data">
        <p>{item.id}</p>
        <div className="info">
          <p>{item.mission_name}</p>
          <p>{item.launcher}</p>
          <p>{item.launch_site.site_name_long}</p>
          <a target="_blank" href={item.links.video_link}>
            <AiOutlineLink fontSize={20} />
          </a>
        </div>
      </div>
    </>;
  });

  return <>{arr}</>;
};

// ++++++++++++
{
  /* <div className="data">
                    <p>{item[0]?.id}</p>
                    <div className="info">
                      <p>{item[0]?.mission_name}</p>
                      <p>{item[0]?.launcher}</p>
                      <p>{item[0]?.launch_site.site_name_long}</p>
                      <a target="_blank" href={item[0]?.links.video_link}>
                        <AiOutlineLink fontSize={20} />
                      </a>
                    </div>
                  </div> */
}
