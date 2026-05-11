import { Profile as ProfileComponent } from "../../modules/Profile";

export const Profile = () => {
  return (
    <div className="grid gap-4 w-full">
      <ProfileComponent />
      <div>is_new_user - {localStorage.getItem("is_new_user")}</div>
      <div>
        onboarding_completed - {localStorage.getItem("onboarding_completed")}
      </div>
      <div>lastBonusAt - {localStorage.getItem("lastBonusAt")}</div>
      <div>meta_card_generation_date - {localStorage.getItem("meta_card_generation_date")}</div>
    </div>
  );
};
