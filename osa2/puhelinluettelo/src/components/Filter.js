const Filter = ({handleFilter, newFilter, handleNewFilter}) => (
    <form onSubmit={handleFilter}>
      <div>
        filter shown with <input
          value={newFilter}
          onChange={handleNewFilter}
        />
      </div>
    </form>
  )

  export default Filter