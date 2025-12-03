const UserCard = ({user, onNext}) => {
    const {firstName, lastName, photoUrl, age,gender,about} = user;

    const handleLike = () => {
        onNext()
    }
    const handlePass = () => {
        onNext()
    }
  return (
    <div className="card bg-base-200 w-96  h-[500px] shadow-sm rounded-2xl">
      <figure className="">
        <img
        className="w-96 h-[600px]"
          src={photoUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title ">{firstName + " " + lastName}</h2>
        <p className="text-gray-400">
          {age  + (gender === "male" ?"M":gender ==="female"?"F":"NB")}
        </p>
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button className="btn bg-rose-500" onClick={handlePass}>Pass</button>
          <button className="btn bg-green-400" onClick={handleLike}>Like</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;