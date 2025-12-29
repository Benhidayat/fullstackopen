import { useSelector } from "react-redux";

const Notification = () => {
  const notifs = useSelector(state => state.notif);
  console.log(useSelector(state => state))
 
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return (
    <div style={style}> 
      {notifs}
    </div>
  )
}

export default Notification
