class Api::V1::ProjectResource < JSONAPI::Resource
  after_create :set_project_permissions
  after_save :set_updated_by
  
  attributes :name,
    :build_year,
    :bbls,
    :ceqr_number,
    :borough,
  
    :created_at,
    :updated_at,
    :updated_by,

    :total_units,
    :senior_units,

    :view_only, # computed attribute

    # Traffic
    :traffic_zone
  
  has_many :editors, relation_name: :editors
  has_many :viewers, relation_name: :viewers
  has_many :project_permissions

  has_one :public_schools_analysis

  def view_only
    self.viewers.map(&:id).include? current_user.id
  end

  def self.records(options = {})
    user = options.fetch(:context).fetch(:current_user)
    # Should be more granular, returning editable and vieable seperately
    # Currently, a view can still edit a project
    user.editable_and_viewable_projects
  end

  def self.updatable_fields(context)
    super - [:created_at, :updated_at, :updated_by, :view_only]
  end

  private

  def current_user
    @context.fetch(:current_user)
  end

  def set_project_permissions
    ProjectPermission.create!({
      project_id: @model.id,
      user_id: current_user.id,
      permission: "editor"
    })
  end

  def set_updated_by
    Project.find(@model.id).update({updated_by: current_user.email})
  end
end