import SectionHeader from "../sectionHeader";

const SalesSection = () => {
  return (
    <section>
      <div className="container">
        <SectionHeader title="Sale" to="/sales" buttonText="All sales" />
      </div>
    </section>
  );
};

export default SalesSection;
