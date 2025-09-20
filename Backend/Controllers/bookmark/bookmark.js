import {supabase} from '../../Config/supabaseClient.js'
export const CreateBookmark = async (req, res) => {
    //date is optional and airline is optional too
  try {
    const { route, date, airline, id, target_price } = req.body;
      const { origin, destination } = route;
    if (!origin || !date || !airline || !target_price || !id||!destination) {
        return res.status(400).json({ message: "all fields are required" });
      }
      
      const { data, error } = await supabase.rpc('insert_bookmark', { p_user_id: id, p_origin: origin,p_destination:destination,p_target_price:target_price,p_airline:airline,p_date:date} )

      if (error) {
    return res.status(400).json({message:error})
      }
      return res.status(200).json({ message: "bookmark created" });



  } catch (error) {
      return res.status(500).json({ message: error.message });
  }  
    
    
    
}