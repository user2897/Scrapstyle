export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#F4EFEA]">
      <div 
        className="absolute -top-4 -left-4 w-24 h-24 bg-[#FFDE00] border-2 border-[#383838]"
        style={{ boxShadow: '-5px 5px 0px 0px #383838' }}
      />
      <div 
        className="absolute top-24 -left-6 w-14 h-14 bg-[#007aff] border-2 border-[#383838]"
        style={{ boxShadow: '-4px 4px 0px 0px #383838' }}
      />
      
      <div 
        className="absolute -top-6 right-20 w-16 h-16 bg-[#53DBC9] border-2 border-[#383838]"
        style={{ boxShadow: '-4px 4px 0px 0px #383838' }}
      />
      <div 
        className="absolute top-16 -right-3 w-20 h-20 bg-white border-2 border-[#383838]"
        style={{ boxShadow: '-5px 5px 0px 0px #383838' }}
      />
      
      <div 
        className="absolute bottom-32 -left-8 w-20 h-20 bg-white border-2 border-[#383838]"
        style={{ boxShadow: '-5px 5px 0px 0px #383838' }}
      />
      <div 
        className="absolute -bottom-4 left-16 w-12 h-12 bg-[#FF7169] border-2 border-[#383838]"
        style={{ boxShadow: '-4px 4px 0px 0px #383838' }}
      />
      
      <div 
        className="absolute -bottom-6 -right-6 w-28 h-28 bg-[#007aff] border-2 border-[#383838]"
        style={{ boxShadow: '-6px 6px 0px 0px #383838' }}
      />
      <div 
        className="absolute bottom-28 right-8 w-10 h-10 bg-[#FFDE00] border-2 border-[#383838]"
        style={{ boxShadow: '-3px 3px 0px 0px #383838' }}
      />
    </div>
  );
}
