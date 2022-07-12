const Filter = ({handleFilter, filter }) => (
    <form onSubmit={handleFilter}>
      <div>
        filter shown with <input
          value={filter}
          onChange={handleFilter}
        />
      </div>
    </form>
  )

  export default Filter